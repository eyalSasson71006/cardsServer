const express = require("express");
const { createCard, getCards, getCard, getMyCards, updateCard, changeBizNumber, likeCard, deleteCard } = require("../models/cardsAccessDataService");
const auth = require("../../auth/authService");
const normalizeCards = require("../helpers/normalizeCard");
const { handleError } = require("../../utils/handleErrors");
const validateCard = require("../validation/cardValidationService");
const { isBizNumberExists } = require("../helpers/generateBizNumber");

const router = express.Router();

router.post("/", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isBusiness) {
            return handleError(res, 403, "Only business user can create new card");
        }
        const errorMessage = validateCard(req.body);
        if (errorMessage !== "") {
            return handleError(res, 400, "Validation error: " + errorMessage);
        }
        let card = await normalizeCards(req.body, userInfo._id);
        card = await createCard(card);
        res.status(201).send(card);
    } catch (error) {
        handleError(res, error.status || 400, error.message);

    }
});

router.get("/", async (req, res) => {
    try {
        let cards = await getCards();
        res.send(cards);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.get("/my-cards", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isBusiness) {
            return handleError(res, 403, "Only business user can get my cards");
        }
        let cards = await getMyCards(userInfo._id);
        res.send(cards);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let cards = await getCard(id);
        res.send(cards);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.put("/:id", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;
        const newCard = req.body;
        const fullCardFromDb = await getCard(id);
        if (userInfo._id != fullCardFromDb.user_id && !userInfo.isAdmin) {
            return handleError(res, 403, "Authorization Error: Only the user who created the business card or admin can update its details");
        }
        let card = await normalizeCards(newCard, userInfo._id);
        card = await updateCard(id, card);
        res.send(card);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.patch("/biz-number/:id", auth, async (req, res) => {
    try {
        if (await isBizNumberExists(req.body.bizNumber)) {
            return handleError(res, 400, "Business number already exists");
        };
        const userInfo = req.user;
        const { id } = req.params;
        const fullCardFromDb = await getCard(id);
        if (userInfo._id != fullCardFromDb.user_id && !userInfo.isAdmin) {
            return handleError(res, 403, "Authorization Error: Only the user who created the business card or admin can update its bizNumber");
        }
        let cards = await changeBizNumber(id, req.body);
        res.send(cards);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.patch("/:id", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        const { id } = req.params;
        let cards = await likeCard(id, userInfo._id);
        res.send(cards);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;
        const fullCardFromDb = await getCard(id);
        if (userInfo._id != fullCardFromDb.user_id && !userInfo.isAdmin) {
            return handleError(res, 403, "Authorization Error: Only the user who created the business card or admin can delete it");
        }
        let cards = await deleteCard(id);
        res.send(cards);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

module.exports = router;