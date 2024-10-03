const fs = require("fs");
const path = require("path");
const { currentTime } = require("../utils/timeHelper");


const fileLogger = (status, message) => {
    if (!status || status < 400) return;
    const { year, month, day, hours, minutes, seconds } = currentTime();
    let log = `${year}/${month}/${day} ${hours}:${minutes}:${seconds} | Status: ${status} | ${message}\n`;

    const logsDir = path.join(__dirname, "../logs");

    if (!fs.existsSync(logsDir)) {
        fs.mkdirSync(logsDir);
    }

    const logFilePath = path.join(logsDir, `${day}_${month}_${year}.txt`);

    fs.appendFile(logFilePath, log, (err) => {
        if (err) {
            console.log("Error while creating file", err);
        } else {
            console.log("File Created successfully");
        }
    });
};

module.exports = fileLogger;