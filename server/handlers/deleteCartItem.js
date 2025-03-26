const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const deleteCartItem = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
    const cartId = Number(req.params.cartId);
    const itemId = Number(req.params.itemId); 

    if (!cartId || !itemId) {
        return res.status(400).json({ status: 400, message: "Cart ID and Item ID are required." });
    }

    try {
        await client.connect();
        const db = client.db("e-commerce");

        const result = await db.collection("cart").updateOne(
            { cartId }, 
            { $pull: { items: { _id: itemId } } } 
        );

        if (result.modifiedCount > 0) {
            res.status(200).json({ status: 200, message: "Item removed from cart." });
        } else {
            res.status(404).json({ status: 404, message: "Item not found in cart." });
        }
    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();
    }
};

module.exports = deleteCartItem;
