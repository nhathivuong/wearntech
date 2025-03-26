const {MongoClient} = require("mongodb")
require("dotenv").config();
const {MONGO_URI} = process.env;
const {v4: uuidv4} = require("uuid")

const addItemToCart = async(req, res) =>{
    const {cartId} = req.params || uuidv4()
    const {newitem} = req.body
    if(!newitem){
        return res.status(404).json({
            status:404,
            message: "invalid item data"
        })
    }
    const client = new MongoClient(MONGO_URI)
    try{
        await client.connect()
        const db = client.db("e-commerce")
        //find if cart exist
        const foundCart = await db.collection("cart").findOne({_id: cartId})
        // if the cart does not exist create a new cart
        if(!foundCart){
            const newCart = await db.collection("cart").insertOne({
                _id: cartId,
                items: [newitem],
            })
            res.status(201).json({
                status: 201,
                message:"A new cart was created with the new item",
                data: newCart
            })
        }
        //find if the item already exist in the cart and changes the quantity if it does 
        const itemAlreadyInCart = foundCart.items.find((item) => item._id === newitem._id)
        if(itemAlreadyInCart){
            const updateQuantity = foundCart.items.map((item) => 
                item._id === newitem._id
                ? { ...item, quantity: item.quantity + newitem.quantity}
                : item
            )
            const newCart = await db.collection("cart").updateOne({_id: cartId},{$set: {items: updateQuantity}})
            res.status(200).json({
                status: 200,
                data: newCart,
                message: "The cart has been updated"
            })
        }
        //adds the item to the cart if it is not in the cart
        else{
            const newCart = await db.collection("cart").updateOne({_id:cartId}, {$push: {items: newitem}})
            res.status(200).json({
                status:200,
                data: newCart,
                message: "The item has been added to the cart"
            })
        }
    }
    catch(error){
        console.log(error)
        res.status(502).json({
            status:502,
            message: error.message
        })
    }
    finally{
        await client.close()
    }
}

module.exports = addItemToCart