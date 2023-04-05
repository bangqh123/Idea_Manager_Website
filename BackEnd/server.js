const express = require('express');
const app = express();
const bodyParser = require("body-parser");

const ErrorMiddelWare = require("./middleware/error");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
// parse application/json
app.use(bodyParser.json());

const fileUpload = require("express-fileupload");
app.use(fileUpload());

require("dotenv").config();
const cors = require("cors");
app.use(cors());
global.publicPath = __dirname + "/public";

app.use(function (req, res, next) {
  global.req = req;
  next();
});

app.use(express.static(__dirname + "/public"));

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connected Scussefully");
  })
  .catch((err) => console.log(err));

require("./helpers/extend-node-input-validator");
require("./routes/index")(app);

const http = require("http");
const server = http.Server(app);
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server is running on port localhost:${port}`);
});

//
app.use(ErrorMiddelWare);
