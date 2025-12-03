import userServices from "../services/Users.js";

const userController = {};

userController.createUser = async (req, res) => {
  try {
    let { firstName, lastName, email, password } = req.body;

    let resp = await userServices.createUser(
      firstName,
      lastName,
      email,
      password
    );

    res.status(200).send(resp);
  } catch (error) {}
};


export default userController;