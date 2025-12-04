import uiTextsServices from "../services/uiTexts.js";

const uiTextsControllers = {};

uiTextsControllers.getUiTexts = async (req, res) => {
  try {
    let { lang, screen } = req.query;

    if (!lang || !screen) {
      res.status(400).json({ message: "Screen and language are required" });
    }

    let { status, ...rest } = await uiTextsServices.getUiTexts(
      screen,
      lang
    );

    res.status(status).json(rest);
  } catch (error) {
    console.error("Error getting UI Texts: ", error);
    res.status(400).json({ message: "Error getting UI Texts!" });
  }
};

export default uiTextsControllers;
