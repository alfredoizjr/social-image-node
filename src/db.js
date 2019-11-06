const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/dbImgSocial", {
    useNewUrlParser: true,
    useUnifiedTopology: true 
  })
  .then(() => {
    console.log("db is connected");
  })
  .catch(err => {
    console.log(`Error in db ${err}`);
  });

module.exports = mongoose;
