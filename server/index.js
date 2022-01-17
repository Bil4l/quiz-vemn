const express = require('express');
const http = require('http');
const socket = require('./lib/sockets');
const favicon = require('serve-favicon');
const path = require('path');
const config = require('./config/db.js')
const mongoose = require('mongoose');
const questionRouter = require('./routes');


const PORT = 3000;

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use('/questions', questionRouter);  


app.use('/',express.static("public"));

const server = http.createServer(app);

mongoose.connect(config.URL,{useNewUrlParser: true, useUnifiedTopology: true})
  .then(()=>{
    server.listen(PORT, function() {
      console.log(`Server is listening on ${PORT}!`)
      socket.init(server);
    })
  });





