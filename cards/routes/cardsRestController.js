const express = require("express");
const { createCard, getCards, getCard, getMyCards, updateCard, changeBizNumber, likeCard, deleteCard } = require("../models/cardsAccessDataService");
const auth = require("../../auth/authService");

const router = express.Router();

router.post("/", auth, async (req, res) => {
    try {
        let card = await createCard(req.body);
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

router.get("/my-cards",auth, async (req, res) => {
    try {
        const { id } = req.body;
        let cards = await getMyCards(id);
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
        const { id } = req.params;
        let cards = await updateCard(id, req.body);
        res.send(cards);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.patch("/biz-number/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        let cards = await changeBizNumber(id, req.body);
        res.send(cards);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.patch("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        let cards = await likeCard(id, userId);
        res.send(cards);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        let cards = await deleteCard(id);
        res.send(cards);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;