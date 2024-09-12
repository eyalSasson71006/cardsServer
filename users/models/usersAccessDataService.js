const { generateAuthToken } = require("../../auth/providers/jwt");
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

const loginUser = async (email, password) => {
    try {
        const user = await User.findOne({email: email});
        if(!user) {
            throw new Error("Authentication Error: Invalid email or password")
        }
        if (user.password !== password){
            throw new Error("Authentication Error: Invalid email or password")
        }
        return generateAuthToken(user)
    } catch (error) {
        throw new Error(error);
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

module.exports = { registerUser, getUsers, getUserById, loginUser };