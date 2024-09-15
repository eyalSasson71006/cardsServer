const express = require("express");
const { createCard, getCards, getCard, getMyCards, updateCard, changeBizNumber, likeCard, deleteCard } = require("../models/cardsAccessDataService");
const auth = require("../../auth/authService");
const normalizeCards = require("../helpers/normalizeCard");

const router = express.Router();

router.post("/", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isBusiness) {
            return res.status(403).send("Only business user can create new card");
        }
        let card = await normalizeCards(req.body, userInfo._id);
        card = await createCard(card);
        res.send(card);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/", async (req, res) => {
    try {
        let cards = await getCards();
        res.send(cards);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/my-cards", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isBusiness) {
            return res.status(403).send("Only business user can get my cards");
        }
        let cards = await getMyCards(userInfo._id);
        res.send(cards);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let cards = await getCard(id);
        res.send(cards);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put("/:id", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;
        const newCard = req.body;
        const fullCardFromDb = await getCard(id);
        if (userInfo._id !== fullCardFromDb.user_id && !userInfo.isAdmin) {
            return res
                .status(403)
                .send(
                    "Authorization Error: Only the user who created the business card or admin can update its details"
                );
        }
        let card = await normalizeCards(newCard, userInfo._id);
        card = await updateCard(id, card);
        res.send(card);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.patch("/biz-number/:id", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;
        const fullCardFromDb = await getCard(id);
        if (userInfo._id !== fullCardFromDb.user_id && !userInfo.isAdmin) {
            return res
                .status(403)
                .send(
                    "Authorization Error: Only the user who created the business card or admin can update its bizNumber"
                );
        }
        let cards = await changeBizNumber(id, req.body);
        res.send(cards);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.patch("/:id", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;
        let cards = await likeCard(id, userInfo._id);
        res.send(cards);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;
        const fullCardFromDb = await getCard(id);
        if (userInfo._id !== fullCardFromDb.user_id && !userInfo.isAdmin) {
            return res
                .status(403)
                .send(
                    "Authorization Error: Only the user who created the business card or admin can delete it"
                );
        }
        let cards = await deleteCard(id);
        res.send(cards);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;