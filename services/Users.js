import CryptoJS from "crypto-js";
import pool from "../utils/database.js";
// import jwt from jsonwebtoken;

const userServices = {};

userServices.createUser = async (firstName, lastName, email, password) => {
  try {
    const hashPassword = CryptoJS.SHA256(password).toString();
    let createUserRes = await pool.query(
      "Insert into users(email,first_name,last_name,password_hash) values($1,$2,$3,$4);",
      [email, firstName, lastName, hashPassword]
    );

    console.log(createUserRes);
    return createUserRes;
  } catch (error) {}
};

// userServices.loginUser = async (email, hashPassword) => {
//   try {
//     let userResp = await pool.query(
//       'SELECT id, email, password from users where email = $1;',
//       [email]
//     );

//     userResp = userResp.rows[0];
    
//     let hashedPassword = CryptoJS.SHA256(hashPassword).toString();

//     if(hashedPassword === hashPassword){
//         const payload = {
//             id: userResp.id,
//             email: userResp.email
//         };

//         const token = jwt.sign(payload,process.env.JWT_SECRET,{
//             expiresIn: '1h'
//         });

//         return {
//             token,
//             user:{
//                 userId: userResp.id,
//                 email: userResp.email,
//                 firstName: userResp.firstName,
//                 lastName: userResp.lastName
//             }
//         }
//     }


//   } catch (error) {}
// };

export default userServices;
