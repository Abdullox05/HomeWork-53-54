const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookie = require("cookie-parser");

const config = require("../config");
const sequelize = require("./database");
const routes = require("./routes");
const error_handler = require("./middlewares/error_handler_middleware");

require("./models/associations");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());
app.use(cookie());

app.use(express.static(process.cwd() + "/uploads"));

app.use("/api", routes);

app.use(error_handler);

const bootstrap = async () => {
  await sequelize.authenticate({
    logging: false,
  });

  await sequelize.sync({
    logging: false,
    alter: true,
  });

  app.listen(config.port, () => {
    console.log(`Server listening on port: ${config.port}`);
  });
};

bootstrap();
