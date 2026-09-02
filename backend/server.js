const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const dbConnect = require("./config/db.config");
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const categoryRoute = require("./routes/categoryRoute");
const siteRoute = require("./routes/siteRoute");
const profileRoute = require("./routes/profileRoute");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is running successfully",
    variable: process.env.ACCESS_TOKEN,
  });
});

app.use("/api/v1", authRoute);
app.use("/api/v1", productRoute);
app.use("/api/v1", categoryRoute);
app.use("/api/v1", siteRoute);
app.use("/api/v1", profileRoute);

dbConnect();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is running at port: " + PORT);
});
