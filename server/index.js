const express = require('express')
const app = express()
const cors = require('cors') //For accessing api within own url for localhost access
const jwt = require('jsonwebtoken')
const {addUser, getPasswordForUsername} = require('./users')
const sequelize = require('./orm')
const bcrypt = require('bcrypt');
const ChatUser = require('./models/ChatUser');
const Message = require('./models/Message');


require('./models/Associations')
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const posts = [
    {
        username: 'Jane',
        email: "jane@gmail.com"
    },
    {
        username: "Poda",
        email: "Poda@gmail.com"
    }
]

// Storage of refreshTokens
let refreshTokens = [];

// Content type application/json
app.post('/refreshtoken', (req,res)=>{
    const refreshToken = req.body.refreshToken;
    if(refreshToken==null) return res.sendStatus(401);;
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(401);

    const jwtSecretKey =process.env.ACCESS_TOKEN_KEY;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user)=>{
        if(err) return res.sendStatus(403);
        const accessToken=jwt.sign({username: user.username}, jwtSecretKey, { expiresIn: '20m' });
        res.json({accessToken: accessToken});
    })

})

app.delete('/logout', (req,res)=>{
    refreshTokens = refreshTokens.filter(token => token != req.body.accessToken);
    res.sendStatus(204);
})

app.post('/login',async (req,res)=>{
    console.log(req.body);

    const username = req.body.inputUsername;
    const password = req.body.inputPassword;
    // const { username, password } = req.body;

    const localPassword = await getPasswordForUsername(username);
    // const hashedPassword = await bcrypt.hash(password, 10);

    try{
    bcrypt.compare(password, localPassword, (error, result) => { 
        if (error) {
        return res.status(500).json({message: "failed"});
        return;
        }


        if(!result) {
        return res.status(401).json({ message: "Invalid password" });
        return;
        }
        console.log(result);  // result is true when password and hashedPassword match
    


    let user = {
        username: username,
        signInTime: Date.now()
    };

    console.log(user);
    const jwtSecretKey =process.env.ACCESS_TOKEN_KEY;
    const jwtRefreshKey=process.env.REFRESH_TOKEN_KEY;
    const accessToken=jwt.sign(user, jwtSecretKey, { expiresIn: '20m' });
    const refreshToken=jwt.sign(user, jwtRefreshKey);
    refreshTokens.push(refreshToken);
    return res.status(200).json({ message: "success", accessToken , refreshToken});
    });
    } catch(err){
        return res.status(500).json({message: "failed"});
        return;
    }
    // res.send("Got Data");
})


app.post('/signup', async (req,res)=>{
    console.log(req.body);

    const username = req.body.inputUsername;
    const password = req.body.inputPassword;
    const profileImage = req.body.profileImage;

    try{
        const checkDuplicate = await getPasswordForUsername(username);
        console.log(!!checkDuplicate);
        if(!!checkDuplicate) 
        {
            res.status(409).json({message: "duplicate"});
            return;
        }
    } catch (err){
        res.status(500).json({message: "failed"});
        return;
    }


    try{
        const newUser = await addUser(username, password, profileImage);
        if(newUser)
            res.status(201).json({message:"success"});
        else
            res.status(409).json({message: "duplicate"});
    // } catch(err) {
        // res.status(500).json({ error: 'Internal Server Error' });
    } catch (err) {
        res.status(500).json({message: "failed"});
    }
    
})


app.get('/posts', authenticateToken , (req,res)=>{
    // res.json(posts.filter(post=> post.username == req.user.username));
    res.json(posts);
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const authToken = authHeader && authHeader.split(' ')[1];

    if(authToken==null) return res.status(401).json({message: "No Token"});

    const jwtSecretKey =process.env.ACCESS_TOKEN_KEY;
    jwt.verify(authToken, jwtSecretKey, (err, user) => {
        if (err) return res.status(403).json({message: "Invalid Token"});

        req.user = user;

        next();
    })
    
}

sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });



app.listen(4000);