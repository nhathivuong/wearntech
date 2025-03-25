const express = require("express");
const morgan = require("morgan");

const {
    getItems
} = require("./handlers");
const getSingleItem = require("./handlers/getItemId")

const PORT = 4000;

const app = express();

app.use(morgan("tiny"));
app.use(express.json());

app.get("/item/:itemId", getSingleItem);
app.get("/getItems", getItems)
app.get("/test", (req, res) => res.status(200).json("🥓"));

app.get("*", (req, res) => {
    res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for!",
    });
})


// endpoints go here

app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
