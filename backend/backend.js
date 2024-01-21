const express = require("express");
const app = express();
const cors = require("cors");
require("./db/conn");
const ringRoutes = require("./routes/ringRoutes")
const adminRoutes = require("./routes/adminRoutes")
const bodyparser = require("body-parser");

app.use(express.json({limit: '50mb'}))
app.use(cors());
app.use("/ring", ringRoutes)
app.use("/admin", adminRoutes)
app.use(bodyparser.urlencoded({extended: true, parameterLimit: 100000, limit: "500mb"}));
// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));
// app.use(express.bodyParser({ limit: '50mb' })); // Set limit to 50MB or as required


app.listen(5000, () => {
  console.log("Connected to PORT 5000...");
});
