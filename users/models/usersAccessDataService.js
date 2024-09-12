const User = require("./mongodb/User");

const registerUser = async (newUser) => {
    try {
        let user = new User(newUser);
        user = await user.save();
        return user;
    } catch (error) {
        throw new Error("Mongoose " + error.message);
    }
};

const getUserById = async (userId) => {
    try {
        let user = await User.findById(userId);
        return user;
    } catch (error) {
        throw new Error("Mongoose " + error.message);
    }
};

const getUsers = async (userId) => {
    try {
        let user = await User.find();
        return user;
    } catch (error) {
        throw new Error("Mongoose " + error.message);
    }
};

module.exports = { registerUser, getUsers, getUserById };