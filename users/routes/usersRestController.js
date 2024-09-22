const express = require("express");
const { registerUser, getUsers, getUserById, loginUser, deleteUser, editUser, toggleIsBusiness } = require("../models/usersAccessDataService");
const auth = require("../../auth/authService");
const { handleError } = require("../../utils/handleErrors");
const { validateRegistration, validateLogin, validateEditUser } = require("../validation/userValidationService");
const normalizeUser = require("../helpers/normalizeCard");

const router = express.Router();

router.get("/", auth, async (req, res) => {
    try {
        const userInfo = req.user;
        if (!userInfo.isAdmin) {
            return res
                .status(403)
                .send(
                    "Authorization Error: Only an admin can get all users details"
                );
        }
        const users = await getUsers();
        res.send(users);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.get("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;
        if (userInfo._id != id && !userInfo.isAdmin) {
            return handleError(res, 403, "Authorization Error: Only an admin or the user itself can get its details");
        }
        const user = await getUserById(id);
        res.send(user);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;
        if (!userInfo.isAdmin) {
            return handleError(res, 403, "Authorization Error: Only an admin can delete a user");
        }
        const user = await deleteUser(id);
        res.send(user);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.put("/:id", auth, async (req, res) => {
    try {
        const error = validateEditUser(req.body);
        if (error) return handleError(res, 400, `Joi Error: ${error}`);

        const { id } = req.params;
        const newUser = req.body;
        const userInfo = req.user;
        if (userInfo._id != id && !userInfo.isAdmin) {
            return handleError(res, 403, "Authorization Error: Only an admin or the user itself can edit a user");
        }
        const user = await editUser(id, newUser);
        res.send(user);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.patch("/:id", auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userInfo = req.user;
        if (!userInfo.isAdmin) {
            return handleError(res, 403, "Authorization Error: Only an admin can edit a user's business status");
        }
        const user = await toggleIsBusiness(id);
        res.send(user);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const error = validateRegistration(req.body);
        if (error) return handleError(res, 400, `Joi Error: ${error}`);

        let user = normalizeUser(req.body);
        user = await registerUser(user);
        res.status(201).send(user);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

router.post("/login", async (req, res) => {
    try {
        const error = validateLogin(req.body);
        if (error) return handleError(res, 400, `Joi Error: ${error}`);

        let { email, password } = req.body;
        const token = await loginUser(email, password);
        res.send(token);
    } catch (error) {
        handleError(res, error.status || 400, error.message);
    }
});

module.exports = router;