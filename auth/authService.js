const { verifyToken } = require("./providers/jwt");

const tokenGenerator = "jwt";

const auth = (req, res, next) => {
    if (tokenGenerator === "jwt") {
        try {
            const tokenFromClient = req.header("x-auth-token");
            if (!tokenFromClient) {
                throw new Error("Authentication Error: Please Login");
            }
            const userInfo = verifyToken(tokenFromClient);
            if (!userInfo) {
                throw new Error("Authentication Error: Unauthorize user");
            }
            req.user = userInfo;
            return next();
        } catch (error) {
            return res.status(401).send(error.message);
        }
    }

    return res.status(500).send("You did not use valid token generator");
};

module.exports = auth;