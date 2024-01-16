const express = require("express");
const { dbConnection } = require("./models")
const app = express();
require("dotenv").config();
require("./routes/cover.routes")

dbConnection
    .sync({ alter: true })
    .then(() => {
        console.log("DB Connected");
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });

app.use(express.json());
app.use(require('./routes/cover.routes'))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App running at http://localhost:${PORT}`);
});