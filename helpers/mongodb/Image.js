const mongoose = require("mongoose");
const { URL, DEFAULT_VALIDATION } = require("./mongooseValidators");

const Image = new mongoose.Schema({
    url: URL,
    alt: { ...DEFAULT_VALIDATION, required: false, minlength: 0 }
});

module.exports = Image;