const express = require("express");
const { sequelize } = require("./db");
const app = express();

const port = process.env.PORT || 8000;

const initApp = async () => {
  try {
    await sequelize.sync();
    console.log("Connected to Database");

    app.use(express.json());

    app.use("/api/contacts", require("./routers/contacts"));
    app.use("/api/accounts", require("./routers/accounts"));

    app.listen(port, () => console.log(`Server started at port ${port}`));
  } catch (err) {
    process.exit(1);
  }
};

initApp();
