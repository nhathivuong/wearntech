const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const getSingleItem = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
    const itemId = parseInt(req.params.id); // Convert ID from string to number

    if (isNaN(itemId)) {
        return res.status(400).json({ status: 400, message: "Item ID must be a number." });
    }

    try {
        await client.connect();
        const db = client.db("e-commerce");
        console.log("connected");

        const result = await db.collection("items").findOne({ _id: itemId });

        if (result) {
            res.status(200).json({ status: 200, data: result });
        } else {
            res.status(404).json({ status: 404, message: "Item not found." });
        }

    } catch (err) {
        res.status(500).json({ status: 500, message: err.message });
    } finally {
        client.close();
        console.log("disconnected");
    }
};

module.exports = getSingleItem;
