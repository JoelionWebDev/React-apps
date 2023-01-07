const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
console.log("mongoDB connected");

module.exports = connectDB;

// .then(() => console.log("CONNECTED TO DB"))
// .catch((err) => console.log(err));
