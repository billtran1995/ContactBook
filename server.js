const express = require("express");
const { sequelize, Account, Contact } = require("./db");
const app = express();

const port = process.env.PORT || 8000;

const initApp = async () => {
  try {
    await sequelize.sync();
    console.log("Connected to Database");

    app.use(express.json());

    app.listen(port, () => console.log(`Server started at port ${port}`));
  } catch (err) {
    process.exit(1);
  }
};

initApp();
