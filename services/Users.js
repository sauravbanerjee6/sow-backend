import CryptoJS from "crypto-js";
import pool from "../utils/database.js";
import jwt from "jsonwebtoken";

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

userServices.loginUser = async (email, hashPassword) => {
  try {
    let userResp = await pool.query(
      "SELECT id, email, password_hash, first_name, last_name from users where email = $1;",
      [email]
    );

    userResp = userResp.rows[0];

    let hashedPassword = CryptoJS.SHA256(hashPassword).toString();

    if (hashedPassword === userResp.password_hash) {
      const payload = {
        id: userResp.id,
        email: userResp.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return {
        status: 200,
        token,
        user: {
          userId: userResp.id,
          email: userResp.email,
          firstName: userResp.firstName,
          lastName: userResp.lastName,
        },
      };
    } else {
      return { status: 401, message: "Login failed!" };
    }
  } catch (error) {
    console.error("Login Error: ", error);
    return { status: 401, message: "Login Failed" };
  }
};

userServices.verifyToken = (req, res, next) => {
  try {
    const authHeader =
      req.headers && (req.headers.authorization || req.headers.Authorization);

    if (!authHeader) {
      return res.status(401).json({ error: "No Auth Header!" });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ error: "Invalid auth format!" });
    }

    const token = parts[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ error: "Invalid token!", detail: err.message });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "error with token" });
  }
};
export default userServices;
