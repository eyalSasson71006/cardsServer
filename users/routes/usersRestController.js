const express = require("express");
const { registerUser, getUsers, getUserById, loginUser } = require("../models/usersAccessDataService");
const auth = require("../../auth/authService");

const router = express.Router();

router.get("/",auth, async (req, res) => {
    try {
        const users = await getUsers();
        res.send(users);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.get("/:id", auth, async (req, res) => {
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

router.post("/login", async (req, res) => {
    try {
        let {email, password} = req.body
        const token = await loginUser(email,password)
        res.send(token);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router