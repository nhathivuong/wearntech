const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

// updates items
const updateItem = async (req, res) => {
    const client = new MongoClient(MONGO_URI);
    const cartId  = req.params.cartId;    
    const query = { itemId };
    const newValues = { 
        $set: { 
            numInStock: currentNumInStock - quantityOfItem
        }
    };
    try {
        await client.connect();
        const db = client.db("e-commerce");

        // find cart object from database
        const cart = await db.collection("cart").findOne({ cartId: Number(cartId) });
        const itemsInCart = cart.items;

        // For each item in cart
        itemsInCart.map((itemInCart)=>{
            
        })
        // find item data from database
        const foundItem = await db.collection("items").findOne({ _id: Number(itemId) });

        // verify that item data numInStock is not 0
        // verify that item data numInStock - quantityOfItem is not 0

        // update item data

        const result = await db.collection(items).updateOne( query, newValues);


        if (result.modifiedCount === 0) {
            res.status(400).json({ 
            status: 400, 
            message: "Could not update inventory.",
            });
        }
        res.status(202).json({ 
            status: 202,
            message: "Inventory updated successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: error.message,
        });
    } finally {
        client.close();
    }
}

module.exports = updateItems;
