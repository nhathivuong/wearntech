const {MongoClient} = require("mongodb")
require("dotenv").config();
const {MONGO_URI} = process.env;
const {v4: uuidv4} = require("uuid")

const addItemToCart = async(req, res) =>{
    let {cartId, itemId} = req.params
    const {quantity} = req.body
    const newItem = {
        _id: Number(itemId),
        quantity: quantity
    }
    //ensures we have a body
    if(!newItem || !quantity || !itemId){
        return res.status(404).json({
            status:404,
            message: "invalid item data"
        })
    }
    //validates the cart Id
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    const validateId = (id) => uuidRegex.test(id)
    //create a cart id if it doesn't exist or is not valid
    if(!cartId || !validateId(cartId)){
        cartId = uuidv4()
    }
    const client = new MongoClient(MONGO_URI)
    try{
        await client.connect()
        const db = client.db("e-commerce")
        //find if cart exist
        const foundCart = await db.collection("cart").findOne({_id: cartId})
        // if the cart does not exist create a new cart
        if(!foundCart){
            await db.collection("cart").insertOne({
                _id: cartId,
                items: [newItem],
            })
            return res.status(201).json({
                status: 201,
                message: "A new cart with the item has been created",
                data: {
                    _id: cartId,
                    items: [newItem],
                }
            })
        }
        //find if the item already exist in the cart and changes the quantity if it does 
        const itemAlreadyInCart = foundCart.items.find((item) => item._id === newItem._id)
        if(itemAlreadyInCart){
            const updateQuantity = foundCart.items.map((item) => 
                item._id === newItem._id
                ? { ...item, quantity: item.quantity + newItem.quantity} // will have to check quantity is a number
                : item
            )
            const newCart = await db.collection("cart").updateOne({_id: cartId}, {$set: {items: updateQuantity}})
            if(newCart.matchedCount === 0){
                return res.status(404).json({
                    status: 404,
                    message: `The cart ${cartId} was not found when the item does exist in the cart`
                })
            }
            if(newCart.modifiedCount === 0){
                return res.status(409).json({
                    status: 409,
                    message: "the item quantity was not updated"
                })
            }
        }
        //adds the item to the cart if it does not exist in the cart
        if(!itemAlreadyInCart){
            const newCart = await db.collection("cart").updateOne({_id:cartId}, {$push: {items: newItem}})
            if(newCart.matchedCount === 0){
                return res.status(404).json({
                    status:404,
                    message: `The cart ${cartId} was not found when the item does not exist in the cart`
                })
            }
            if(newCart.modifiedCount === 0){
                return res.status(409).json({
                    status:409,
                    message:  "The item was not added to the cart"
                })
            }
        }
        //updated cart
        const updatedCart = await db.collection("cart").findOne({_id: cartId})

        res.status(201).json({
            status: 201,
            message: "Item has been added to cart",
            data: updatedCart
        })
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