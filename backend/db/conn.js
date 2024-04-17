const mongoose = require("mongoose");
const uri = "mongodb+srv://KayraAdmin:KayraAdmin123@kayra-creation.y1eaqmv.mongodb.net/?retryWrites=true&w=majority&appName=Kayra-Creation";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`CONNECTED TO MONGO!`);
  })
  .catch((err) => {
    console.log(`OH NO! MONGO CONNECTION ERROR!`);
    console.log(err);
  });
