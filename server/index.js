const express = require("express");
const morgan = require("morgan");

const {
    getItems,
    getItem,
    getCompanies,
    getCompany,
    getCart,
    addItemToCart,
    deleteAllItemsFromCart,
    deleteItemFromCart,
    confirmPurchase,
    updateItems,
} = require("./handlers");

const PORT = 4000;

const app = express();

app.use(morgan("tiny"));
app.use(express.json());

app.get("/items", getItems)
app.get("/item/:itemId", getItem);
app.get("/companies", getCompanies)
app.get("/company/:companyId", getCompany)
app.get("/cart/:cartId", getCart)

app.post("/cart/:cartId", addItemToCart)
app.delete("/cart/:cartId", deleteAllItemsFromCart)
app.delete("/cart/:cartId/:itemid", deleteItemFromCart)
app.post("/cart/:cartId", confirmPurchase)
app.patch("/cart/:cartId", updateItems)

app.get("*", (req, res) => {
    res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for!",
    });
})


// endpoints go here

app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
