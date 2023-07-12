// import jwt from "jsonwebtoken";
// ​

// const auth = async (req, res, next) => {
//   try {
//     const token =
//       req.headers.authorization && req.headers.authorization.split(" ")[1];
// ​
//     if (token) {
//       //if it is GOOGLE token
//       let decodedData = jwt.decode(token);
//       req.googleId = decodedData?.sub;
//     }
// ​
//     next(); //click the LIKE button => auth middleware(NEXT) => like controller
//   } catch (error) {
//     console.log(error);
//   }
// };
// ​
// export default auth;

import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodedData;

    if (token && isCustomAuth) {
      //if it is our token
      decodedData = jwt.verify(token, "test");

      req.userId = decodedData?.id;
    } else {
      //if it is GOOGLE token
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next(); //click the LIKE button => auth middleware(NEXT) => like controller
  } catch (error) {
    console.log(error);
  }
};

export default auth;
