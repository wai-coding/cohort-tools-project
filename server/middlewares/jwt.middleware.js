// const jwt = require("jsonwebtoken");

// const isAuthenticated = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//       return res.status(401).json({ errorMessage: "No token provided" });
//     }

//     const token = authHeader.split(" ")[1]; // Bearer TOKEN

//     const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

//     req.payload = decoded;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({ errorMessage: "Token is not valid" });
//   }
// };

// module.exports = { isAuthenticated };


const jwt = require("jsonwebtoken");

function isAuthenticated(req, res, next) {
  if (
    req.headers.authorization.split(" ")[0] === "Bearer" &&
    req.headers.authorization.split(" ")[1]
  ) {
    const theTokenInHeaders = req.headers.authorization.split(" ")[1];
    try {
      const decodedToken = jwt.verify(
        theTokenInHeaders,
        process.env.TOKEN_SECRET
      );
      req.payload = decodedToken;
      next();
    } catch (error) {
      res.status(403).json({ errorMessage: "Invalid Token" });
    }
  } else {
    res.status(403).json({ errorMessage: "Headers malformed" });
  }
}

module.exports = { isAuthenticated };
