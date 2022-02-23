const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;
const yearRouter = require("./routes/year");
const quarterRouter = require("./routes/quarter");
const monthRouter = require("./routes/month");

app.get("/", (req, res) => {
	res.json({ message: "alive" });
});

app.use("/splits/:year", yearRouter);
app.use("/splits/:year/quarter/:quarter", quarterRouter);
app.use("/splits/:year/month/:month", monthRouter);

app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});
