const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./Routes/user");
const brandRoutes = require("./Routes/brand");
require('dotenv').config();


const app = express();
app.use(express.json());

const cors = require("cors");

app.use(bodyParser.json());


app.use(cors());

mongoose
  .connect(
   process.env.MONGO_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(express.urlencoded({ extended: false }));


const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(
  createProxyMiddleware(['/register', '/login'], {
    target: 'http://localhost:3000',  // Change to the address of your React development server
    changeOrigin: true,
  })
);


app.use("/user/api", userRoutes);
app.use("/brand/api", brandRoutes);


app.listen(5000, () => {
  console.log("Server started on port 5000");
});

