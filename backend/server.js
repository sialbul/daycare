require("dotenv").config();

const express = require('express');
const app = express();
app.use(express.json());
const routes = require("./routes/postRoutes");

app.use("/", routes());

app.use((err, req, res, next) => {
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);
    res.status(500).json({
        message: "Something went wrong"
    });

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})