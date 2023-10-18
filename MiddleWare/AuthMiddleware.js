
const jwt = require("jsonwebtoken");
// Middleware to verify JWT token
module.exports = function verifyToken(req, res, next) {
  const Btoken = req.headers["authorization"];
//   console.log(Token) if we console it we get : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im11bmVlc2gxMjM0IiwiaWF0IjoxNjk3NjA5MTI2fQ.lZwKQFSTeLGpef7eIjWkC8luc4R3nqiFadm0PgygqLw
//we need to remove Bearer to get exact token ,for removing we use split("")[1] which is given below  

let token=Btoken.split(" ")[1]  //imp

  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//    console.log(process.env.ACCESS_TOKEN_SECRET)
    if (err) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.username = decoded.username;
    next();
  });

  
};
