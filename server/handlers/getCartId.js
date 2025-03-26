const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const getCartId = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
    const cartId = req.params.cartId;

    if (!cartId) {
        return res.status(400).json({ status: 400, message: "Cart ID is required." });
    }

    try {
        await client.connect();
        const db = client.db("e-commerce");

        const cart = await db.collection("cart").findOne({ cartId: Number(cartId) });

        if (cart) {
            res.status(200).json({ status: 200, data: cart.items });
        } else {
            res.status(404).json({ status: 404, message: "Cart not found." });
        }
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();
    }
};

module.exports = getCartId;
