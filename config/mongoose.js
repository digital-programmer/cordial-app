const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/codial_development");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error conecting to MongoDB"));

db.once("open", ()=> {
    console.log("Connected to database :: MongoDB");
})

module.exports = db;