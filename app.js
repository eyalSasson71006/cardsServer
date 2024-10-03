const express = require("express");
const connectToDb = require("./DB/dbService");
const router = require("./router/router");
const corsMiddleware = require("./middlewares/cors");
const { handleError } = require("./utils/handleErrors");
const chalk = require("chalk");
require("dotenv").config();
const loggerMiddleware = require("./logger/loggerService");

const app = express();
const PORT = process.env.PORT || 8181;

app.use(corsMiddleware);
app.use(express.json());

app.use(loggerMiddleware());
app.use(express.static("./public"));
app.use(router);

app.use((err, req, res, next) => {  //error handling
    const message = err || "internal error of the server";
    handleError(res, 500, message);
});

app.listen(PORT, () => {
    console.log(chalk.yellow("server is listening to port " + PORT));
    connectToDb();
});