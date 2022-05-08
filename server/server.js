const express = require('express')
const dotenv = require('dotenv').config()
//const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./db')
const port = process.env.PORT || 5000
var cors = require("cors");
const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json');
var helmet = require("helmet");
connectDB()

const app = express()

 cors: {
   origin: "*";
 }

//  app.all("*", function (req, res, next) {
//    res.header("Access-Control-Allow-Origin", cors.origin);
//    res.header(
//      "Access-Control-Allow-Headers",
//      "Origin, X-Requested-With, Content-Type, Accept"
//    );
//    next();
//  });

//  var allowCrossDomain = function (req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
//    res.header("Access-Control-Allow-Headers", "Content-Type");

//    next();
//  };


//  app.use(allowCrossDomain)


app.use(cors()); 

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/cars', require('./routes/carRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.get('/test', (req, res) => {
    res.send("Its working")
})


//app.use(helmet());



app.listen(port, () => console.log(`Server started on port ${port}`))