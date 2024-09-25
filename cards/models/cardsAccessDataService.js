const { createError } = require("../../utils/handleErrors");
const Card = require("./mongodb/Card");

const config = require("config");

const DB = config.get("DB");

const createCard = async (newCard) => {
    if (DB === "mongodb") {
        try {
            let card = new Card(newCard);
            card = await card.save();
            return card;
        } catch (error) {
            return createError("Mongoose ", error);
        }
    }

    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

const getCards = async () => {
    if (DB === "mongodb") {
        try {
            let cards = await Card.find();
            return cards;
        } catch (error) {
            createError("Mongoose ", error);
        }
    }

    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

const getCard = async (id) => {
    if (DB === "mongodb") {
        try {
            let card = await Card.findById(id);
            return card;
        } catch (error) {
            createError("Mongoose ", error);
        }
    }

    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

const getMyCards = async (userId) => {
    if (DB === "mongodb") {
        try {
            let card = await Card.find({ user_id: userId });
            return card;
        } catch (error) {
            createError("Mongoose ", error);
        }
    }

    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

const updateCard = async (cardId, updatedCard) => {
    if (DB === "mongodb") {
        try {
            let card = await Card.findByIdAndUpdate(cardId, updatedCard, { new: true });
            return card;
        } catch (error) {
            createError("Mongoose ", error);
        }
    }

    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

const changeBizNumber = async (cardId, newBizNumber) => {
    if (DB === "mongodb") {
        try {
            let card = await Card.findByIdAndUpdate(cardId, newBizNumber, { new: true });
            return card;
        } catch (error) {
            createError("Mongoose ", error);
        }
    }

    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

const likeCard = async (cardId, userId) => {
    if (DB === "mongodb") {
        try {
            let card = await Card.findById(cardId);
            if (!card) {
                const error = new Error("a card with this ID cannot be not found in the database");
                return createError("Mongoose", error, 404);
            }
            if (card.likes.includes(userId)) {
                card.likes = card.likes.filter(id => id != userId);
            } else {
                card.likes.push(userId);
            }
            await card.save();
            return card;
        } catch (error) {
            createError("Mongoose ", error);
        }
    }

    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

const deleteCard = async (cardId) => {
    if (DB === "mongodb") {
        try {
            let card = await Card.findByIdAndDelete(cardId);
            return card;
        } catch (error) {
            createError("Mongoose ", error);
        }
    }

    const error = new Error("There is no other db for this requests");
    return createError("DB", error, 500);
};

module.exports = { createCard, getCards, getCard, getMyCards, updateCard, changeBizNumber, likeCard, deleteCard };