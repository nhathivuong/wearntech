const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const login = async (req, res) => {
    const { email, username } = req.body;
    const client = new MongoClient(MONGO_URI);
    if (!email || !username) {
        return res.status(400).json({
            status: 400,
            message: "Email and username are required."
        });
    }
    try {
        await client.connect();
        const db = client.db("e-commerce");
        const user = await db.collection("users").findOne({ email });
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User not found."
            });
        }
        if (user.username !== username) {
            return res.status(401).json({
                status: 401,
                message: "Invalid username or password."
            });
        }
        const { password, ...userData } = user;
        res.status(200).json({
            status: 200,
            message: "Login successful.",
            data: userData
        });
    } catch (error) {
        res.status(502).json({
            status: 502,
            message: error.message
        });
    } finally {
        await client.close();
    }
};

module.exports = login;
