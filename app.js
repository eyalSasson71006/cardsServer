const express = require("express");
const connectToDb = require("./DB/dbService");
const router = require("./router/router");
const corsMiddleware = require("./middlewares/cors");
const { handleError } = require("./utils/handleErrors");

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

app.use((err, req, res, next) => {  //error handling
    const message = err || "internal error of the server"
    handleError(res,500, message)
});

app.listen(PORT, () => {
    console.log("server is listening to port " + PORT);
    connectToDb();
});