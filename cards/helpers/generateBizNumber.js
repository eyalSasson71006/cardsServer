const _ = require("lodash");
const Card = require("../models/mongodb/Card");
const { createError } = require("../../utils/handleErrors");
const generateBizNumber = async () => {
    let cardsCount = await Card.countDocuments();
    if (cardsCount === 9_000_000) {
        const error = new Error("You reached to the maximum cards count in your system");
        createError("Mongoose", error, 409)
    }
    let random;
    do {
        random = _.random(1_000_000, 9_999_999);
    } while (await isBizNumberExists(random));
    return random;
};
const isBizNumberExists = async (bizNumber) => {
    try {
        const cardWithThisBizNumber = await Card.findOne({ bizNumber });
        return Boolean(cardWithThisBizNumber);
    } catch (error) {
        createError("Mongoose", error, 500)
    }
};
module.exports = { generateBizNumber, isBizNumberExists };