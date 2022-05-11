var envirornment = process.env.NODE_ENV || "development";
if (envirornment === "development") {
  require("dotenv").config();
}
//require socket
require("./socket");

//packages
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const cloudinary = require("cloudinary").v2;
const expressUpload = require("express-fileupload");
//swagger
const swaggerDoc = require("./app/config/swagger.config");
const swaggerUI = require("swagger-ui-express");

//routes
const userRoutes = require("./app/routes/user.routes");
const authRoutes = require("./app/routes/auth.routes");

const app = express();

//Database Connection
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DataBase Connected...");
  })
  .catch((err) => {
    console.log(err);
  });

//Configs
var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

//enable cors
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Accept"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// parse requests of content-type - application/json
app.use(express.json({ limit: "50mb" }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

//Set File Limit
app.use(bodyParser.json({ limit: "50mb" }));
//parse cookies
app.use(cookieParser());

//public folder
app.use("/public", express.static(path.join(__dirname, "./app/public")));

//cloud store
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

//swagger
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
//express upload
app.use(expressUpload());
//Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to SE project");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Port Listening on ${PORT}`);
});
