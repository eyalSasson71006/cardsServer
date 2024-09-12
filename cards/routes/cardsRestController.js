const express = require("express");
const { createCard, getCards, getCard, getMyCards, updateCard, changeBizNumber, likeCard, deleteCard } = require("../models/cardsAccessDataService");

const router = express.Router();

router.post("/", async (req, res) => {
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

router.get("/my-cards", async (req, res) => {
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

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let cards = await updateCard(id, req.body);
        res.send(cards);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.patch("/biz-number/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let cards = await changeBizNumber(id, req.body);
        res.send(cards);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        let cards = await likeCard(id, userId);
        res.send(cards);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let cards = await deleteCard(id);
        res.send(cards);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;