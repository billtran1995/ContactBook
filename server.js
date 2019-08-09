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

		app.use((err, req, res, next) => {
			if (!err.output) {
				return res.status(401).json(err.message);
			}
			return res.status(err.output.statusCode).json(err.output.payload);
		});

		if (process.env.NODE_ENV === "production") {
			app.use(express.static("client/build"));

			const path = require("path");
			app.get("*", (req, res) => {
				res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
			});
		}

		app.listen(port, () => console.log(`Server started at port ${port}`));
	} catch (err) {
		process.exit(1);
	}
};

initApp();
