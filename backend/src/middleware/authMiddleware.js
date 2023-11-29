import jwt from "jsonwebtoken"

export const authMiddleWare = (req, res, next) => {
    try {
        const token = req.headers.token.split(' ')[1]
        jwt.verify(token, "B19dccn076", (err, user) => {
            if (err) {
                return res.status(404).json({status: "ERR", message: "The authentication"})
            }
            if (user?.isAdmin) {
                next();
            } else {
                return res.status(404).json({status: "ERR", message: "The authentication"})
            }
        })
    } catch (e) {
        return res.status(404).json({status: "ERR", message: "The token"})
    }

}

export const authUserMiddleWare = (req, res, next) => {
    try {
        const token = req.headers.token.split(" ")[1];
        const userId = req.params.id;
        jwt.verify(token, "B19dccn076", (err, user) => {
            if (err) {
                return res.status(404).json({status: "ERR", message: "The authentication"})
            }
            if (user ?. isAdmin || user ?. id === userId) {
                next();
            } else {
                return res.status(404).json({status: "ERR", message: "The authentication"})
            }
        })
    }catch(e) {
        return res.status(404).json({status: "ERR", message: "The token"})
    }

}
