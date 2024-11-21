const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors")

dotenv.config();
const port = process.env.API_PORT;
app.use(cors("http://localhost:3000/api"))

app.get("/api/test", (req, res) => {
    res.json(`Hello World ${Date.now()}`)
})
if (port) {
    app.listen(port)
    console.log(`Server has started on port ${port}`);
}

module.exports=app