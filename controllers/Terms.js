import termServices from "../services/Terms.js";

const termControllers = {};

termControllers.getTerms = async (req, res) => {
  try {
    let { lang } = req.query;

    if (!lang) {
      res.status(400).json({ message: "Langauge is required!" });
    }

    let { status, ...rest } = await termServices.getTerms(lang);

    res.status(status).json(rest);
  } catch (error) {
    console.error("Error getting terms: ",error);
    res.status(400).json({message: "Error getting terms!"});
  }
};

export default termControllers;
