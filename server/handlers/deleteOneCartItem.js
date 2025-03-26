const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const deleteItemFromCart = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
    const { cartId, itemId } = req.params;

    if (!cartId || !itemId) {
        return res.status(400).json({ status: 400, message: "Cart ID and Item ID are required." });
    }

    try {
        await client.connect();
        const db = client.db("e-commerce");

        const cart = await db.collection("cart").findOne({ _id: cartId });

        if (!cart) {
            return res.status(404).json({ status: 404, message: "Cart not found." });
        }
        const updatedCart = await db.collection("cart").updateOne(
            { _id: cartId },
            { $pull: { items: { _id: itemId } } }
        );
        if (updatedCart.matchedCount === 0) {
            return res.status(404).json({ status: 404, message: "Cart not found." });
        }
        if (updatedCart.modifiedCount === 0) {
            return res.status(409).json({ status: 409, message: "Item was not removed from cart." });
        }
        const finalCart = await db.collection("cart").findOne({ _id: cartId });
        res.status(200).json({
            status: 200,
            message: "Item removed from cart.",
            data: finalCart
        });

    } catch (error) {
        res.status(500).json({ status: 500, message: error.message });
    } finally {
        await client.close();
    }
};

module.exports = deleteItemFromCart;
