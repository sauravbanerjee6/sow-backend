import pool from "../utils/database.js";

const pricelistServices = {};

pricelistServices.getPriceList = async () => {
  try {
    const result = await pool.query("SELECT * from price_items order by id;");

    return { status: result.rowCount === 0 ? 204 : 200, data: result.rows };
  } catch (error) {
    console.error("Error getting price list!: ", error);
    return { status: 400, message: "Error getting price list!" };
  }
};

pricelistServices.updatePriceList = async (id, data) => {
  try {
    if (!Number.isInteger(id)) {
      return { status: 400, message: "Invalid ID!" };
    }

    let updateResult = await pool.query(
      "UPDATE price_items set item_code = $1, name=$2, description=$3, in_price=$4, price=$5, unit=$6, in_stock=$7, updated_at=NOW() WHERE id=$8 RETURNING *;",
      [
        data.item_code ?? null,
        data.name,
        data.description ?? null,
        Number(data.in_price),
        data.price,
        data.unit,
        data.in_stock,
        id,
      ]
    );

    if (updateResult.rowCount === 0) {
      return { status: 404, message: "Item not found!" };
    }

    return {
      status: 200,
      data: updateResult.rows[0],
      message: "Item Updated!",
    };
  } catch (error) {
    console.error("Error updating Item: ", error);
    return { status: 400, message: "Error updating items!" };
  }
};

export default pricelistServices;
