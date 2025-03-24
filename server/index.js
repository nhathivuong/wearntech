const express = require("express");
const morgan = require("morgan");

const PORT = 4000;

const app = express();

app.use(morgan("tiny"));
app.use(express.json());

app.get("/test", (req, res) => res.status(200).json("🥓"));

// endpoints go here

app.listen(PORT, () => console.info(`Listening on port ${PORT}`));
