const _ = require("lodash");
const Card = require("../models/mongodb/Card");
const generateBizNumber = async () => {
    let cardsCount = await Card.countDocuments();
    if (cardsCount === 9_000_000) {
        throw new Error("You reached to the maximum cards count in your system");
    }
    let random;
    do {
        random = _.random(1_000_000, 9_999_9999);
    } while (await isBizNumberExists(random));
    return random;
};
const isBizNumberExists = async (bizNumber) => {
    try {
        const cardWithThisBizNumber = await Card.findOne({ bizNumber });
        return Boolean(cardWithThisBizNumber);
    } catch (error) {
        throw new Error("Mongoose " + error.message);
    }
};
module.exports = { generateBizNumber, isBizNumberExists };