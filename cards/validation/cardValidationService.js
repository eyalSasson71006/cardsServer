const validateCardWithJoi = require("./joi/validateCardWithJoi");

const config = require("config");

const VALIDATOR = config.get("VALIDATOR");

const validateCard = (card) => {
    if (VALIDATOR === "joi") {
        const { error } = validateCardWithJoi(card);
        if (error) return error.details[0].message;
        return "";
    }
};

module.exports = validateCard;