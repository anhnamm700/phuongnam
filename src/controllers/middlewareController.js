import jwt from "jsonwebtoken";

const middlewareController = {
    verifyToken: (req, res, next) => {
        const token = req.header('token');

        if (token) {
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    return res.status(403).json("Token is not valid");
                } 
                req.user = user;
                next(); 
            })
        } else {
            return res.status(401).json("You're not authenticated");
        }
    },

    verifyTokenAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, res, () => {
            if (req.user.id === req.params.id || req.user.admin) {
                console.log(req.user);
                // next();
            } else {
                return res.status(403).json("You're not allowed to delete other");
            }
        });
    }
}

module.exports = middlewareController;