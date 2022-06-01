"use strict";
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/yomrest")
    .then((db) => {
    console.log("Connected to MongoDB:", db.connections[0].name);
}).catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
});
