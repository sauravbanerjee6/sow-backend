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

userController.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "Both email and password required!" });
    }

    const { status, ...rest } = await userServices.loginUser(email, password);

    res.status(status).json(rest);
  } catch (error) {}
};

export default userController;
