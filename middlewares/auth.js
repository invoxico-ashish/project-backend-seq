const jwt = require("jsonwebtoken")
const secrteKey = process.env.JWT_SECRTE_KEY
function authenticateToken(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ success: false, message: "Access Denied" })
    jwt.verify(token, secrteKey, (err, user) => {
        if (err) return res.status(403).json({ success: false, message: "Invalid Token", err })
        next();
    })
}
module.exports = authenticateToken;




// const jwt = require("jsonwebtoken")
// const secrteKey = process.env.JWT_SECRTE_KEY


// function authenticateToken(req, res, next) {
//     console.log("cheking token.......")
//     const authorizationHeader = req.header("authorization");
//     const [bearer, token] = authorizationHeader.split(" ");
//     if (!authorizationHeader) {
//         return res.status(401).json({ success: false, message: "Access Denied" })
//     }
//     jwt.verify(token, secrteKey, (err, user) => {
//         if (err) return res.status(498).json({ success: false, message: "Invalid Token", err })
//         console.log("verified")
//         next();
//     });
// }
// module.exports = authenticateToken;