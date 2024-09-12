const jwt = require("jsonwebtoken");
const SECRET_WORD = "secret";

const generateAuthToken = (user) => {
    return jwt.sign({
        _id: user._id,
        isBusiness: user.isBusiness,
        isAdmin: user.isAdmin,
    }, SECRET_WORD);
};

const verifyToken = (tokenFromClient) => {
    try {
        return jwt.verify(tokenFromClient, SECRET_WORD);
    } catch (error) {
        return null;
    }
};

module.exports = { generateAuthToken, verifyToken };