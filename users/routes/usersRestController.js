const express = require("express");
const { registerUser, getUsers, getUserById } = require("../models/usersAccessDataService");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const users = await getUsers();
        res.send(users);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.send(user);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router