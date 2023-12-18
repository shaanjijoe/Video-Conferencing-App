const express = require('express')
const app = express()
const http = require('http');
const server = http.createServer(app);
const cors = require('cors') //For accessing api within own url for localhost access
const sequelize = require('./orm')
const authenticationrouter = require('./authentication');
const configureSockets = require('./socketing')

require('./models/Associations')
require("dotenv").config();
app.use(cors({
  origin: '*',
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', authenticationrouter);  //Auth Apis



// Syncing Database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

// Configure sockets and pass the http server instance
configureSockets(server);


const PORT = process.env.PORT || 4000;

// io.listen(4000);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});