const mongoose = require("mongoose");

const url =
  "mongodb+srv://apoorvakesarwani001:1AKWWqaj5p7J8pay@cluster0.fcswvjz.mongodb.net/";
module.exports.connect = () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      // useFindAndModify: false,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    })
    .then(() => console.log("MongoDB is connected successfully"))
    .catch((err) => console.log("Error: ", err));
};
