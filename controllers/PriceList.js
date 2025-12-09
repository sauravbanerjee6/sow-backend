import pricelistServices from "../services/Pricelist.js";

const pricelistControllers = {};

pricelistControllers.getPriceList = async (req, res) => {
  try {
    let { status, ...rest } = await pricelistServices.getPriceList();
    res.status(status).json(rest);
  } catch (error) {
    console.error("Error getting price list: ", error);
    res.status(400).json({ message: "Error fetching price list!" });
  }
};

pricelistControllers.updatePriceList = async (req, res) => {
  try {
    let { id } = req.query;
    id = Number(id);
    let data = req.body;

    let { status, ...rest } = await pricelistServices.updatePriceList(id, data);

    res.status(status).json(rest);
  } catch (error) {
    console.error("Error updating price list: ", error);
    res.status(400).json({ message: "Error updating price list!" });
  }
};

export default pricelistControllers;
