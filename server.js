const express = require("express");
const fs = require("fs");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const path = require("path");
const bodyParser = require("body-parser");
const connectDb = require("./server/database/connection");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

// create a write stream (in append mode)
let accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), { flags: "a" });

//log requests
app.use(morgan("tiny"));
app.use(morgan("combined", { stream: accessLogStream }));

//MongoDb Connection
connectDb();

//parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

//set view engine
app.set("view engine", "ejs");
// app.set('views', path.resolve(__dirname, 'views/ejs'))

//load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

//load route
app.use("/", require("./server/routes/routes"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
