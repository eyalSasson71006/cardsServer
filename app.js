const express = require("express");
const connectToDb = require("./DB/dbService");
const router = require("./router/router");
const corsMiddleware = require("./middlewares/cors");

const app = express();
const PORT = 8181;

app.use(
    corsMiddleware
);

app.use(express.json());

app.use((req, res, next) => {    
    console.log(
        `Request URL: ${req.url} | Method: ${req.method} | Time: ${new Date()}`
    );
    next();
});

app.use(router);

app.use((err,req,res,next)=>{  //error handling
    console.log(err);
    res.status(500).send("internal error of the server")
})

app.listen(PORT, () => {
    console.log("server is listening to port " + PORT);
    connectToDb();
});