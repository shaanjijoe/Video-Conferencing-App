const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {addUser, getPasswordForUsername} = require('./users');
const {getProfileForUsername, getMessagesAndProfileImage, insertMessage} = require('./chatData');
const bcrypt = require('bcrypt');


let refreshTokens = [];

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

router.post('/refreshtoken', (req,res)=>{
    const refreshToken = req.body.refreshToken;
    if(refreshToken==null) return res.sendStatus(401);;
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(401);

    const jwtSecretKey =process.env.ACCESS_TOKEN_KEY;
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user)=>{
        if(err) return res.sendStatus(403);
        const accessToken=jwt.sign({username: user.username}, jwtSecretKey, { expiresIn: '20m' });
        res.json({accessToken: accessToken});
    })

});

router.delete('/logout', (req,res)=>{
    refreshTokens = refreshTokens.filter(token => token != req.body.accessToken);
    res.sendStatus(204);
});

router.post('/login',async (req,res)=>{
    // console.log(req.body);

    const username = req.body.inputUsername;
    const password = req.body.inputPassword;
    const localPassword = await getPasswordForUsername(username);

    try{
        bcrypt.compare(password, localPassword, (error, result) => { 
        if (error) {
        return res.status(500).json({message: "failed"});
        }


        if(!result) {
        return res.status(401).json({ message: "Invalid password" });
        }
        // console.log(result);  // result is true when password and hashedPassword match
    
        let user = {
            username: username,
            signInTime: Date.now()
        };

        console.log(user);
        const jwtSecretKey =process.env.ACCESS_TOKEN_KEY;
        const jwtRefreshKey=process.env.REFRESH_TOKEN_KEY;
        const accessToken=jwt.sign(user, jwtSecretKey, { expiresIn: '20h' });
        const refreshToken=jwt.sign(user, jwtRefreshKey);
        refreshTokens.push(refreshToken);
        console.log(username, " logged in!")
        return res.status(200).json({ message: "success", accessToken , refreshToken});
        });
    } catch(err){

        return res.status(500).json({message: "failed"});

    }
    // res.send("Got Data");
});


router.post('/signup', async (req,res)=>{
    // console.log(req.body);

    const username = req.body.inputUsername;
    const password = req.body.inputPassword;
    const profileImage = req.body.profileImage;

    try{
        const checkDuplicate = await getPasswordForUsername(username);
        console.log(!!checkDuplicate);
        if(!!checkDuplicate) 
        {
            console.log(username, " already exisis!")
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

    } catch (err) {
        res.status(500).json({message: "failed"});
    }
    
})


module.exports = router;