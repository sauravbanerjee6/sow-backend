import pool from "../utils/database.js";

const uiTextsServices = {};

uiTextsServices.getUiTexts = async (screen, lang) => {
  try {
    let queryResult = await pool.query(
      "SELECT text_key, text_value from ui_texts where screen = $1 and language_code = $2;",
      [screen, lang]
    );

    const texts = {};

    queryResult.rows.map((row) => {
      texts[row.text_key] = row.text_value;
    });

    return { screen, lang, texts, status: 200 };
  } catch (error) {
    console.error("Error getting UI Texts: ", error);
    return { status: 200, message: "Error getting UI Codes!" };
  }
};

export default uiTextsServices;
