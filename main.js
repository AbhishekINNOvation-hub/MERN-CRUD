require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");

const app = express();
const PORT = process.env.PORT || 4000;

//database connection
mongoose.connect("mongodb://35.78.232.55:27017/crud", { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected to the database"));

// middle ware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
    session({
        secret: "my seceret key",
        saveUninitialized: true,
        resave: false,
    }));

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.use(express.static("uploads"));
//set templet engin
app.set('view engine', 'ejs');

//route
app.use("", require("./routes/routes"));

app.listen(PORT, () => {
    console.log('server started at port 5000', PORT);
});