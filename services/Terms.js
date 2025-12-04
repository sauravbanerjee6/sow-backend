import pool from "../utils/database.js";

const termServices = {};

termServices.getTerms = async (lang) => {
  try {
    let queryResult = await pool.query(
      "SELECT language_code, version, content from terms where language_code = $1 and is_active = TRUE ORDER BY version LIMIT 1;",
      [lang]
    );

    if (queryResult.rowCount === 0) {
      return { status: 204, message: "No terms available for this language!" };
    }

    const row = queryResult.rows[0];

    return {
      status: 200,
      language: lang,
      version: row.version,
      content: row.content,
    };
  } catch (error) {
    console.error("Error getting terms: ", error);
    return { status: 400, message: "Error fetching terms!" };
  }
};

export default termServices;
