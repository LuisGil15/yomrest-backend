const mongoose = require('mongoose');

mongoose
  .connect(
    "mongodb+srv://luisgil:Yomrest_2022@yomrest.12olw.mongodb.net/?retryWrites=true&w=majority"
  )
  .then((db: any) => {
    console.log("Connected to MongoDB:", db.connections[0].name);
  })
  .catch((err: any) => {
    console.log("Error connecting to MongoDB: ", err);
  });
