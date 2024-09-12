const mongoose = require("mongoose");
const { PHONE, DEFAULT_VALIDATION, EMAIL, URL } = require("../../../helpers/mongodb/mongooseValidators");
const Image = require("../../../helpers/mongodb/image");
const Address = require("../../../helpers/mongodb/address");

const cardSchema = new mongoose.Schema({
    title: DEFAULT_VALIDATION,
    subtitle: DEFAULT_VALIDATION,
    description: {
        ...DEFAULT_VALIDATION,
        maxLength: 1024
    },
    phone: PHONE,
    email: EMAIL,
    web: URL,
    image: Image,
    address: Address,
    bizNumber: {
        type: Number,
        min: 1000000,
        max: 9999999,
        required: true
    },
    likes: [String],
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }

});

const Card = mongoose.model("card", cardSchema)

module.exports = Card;