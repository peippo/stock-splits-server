const express = require("express");
const router = express.Router({ mergeParams: true });
const splits = require("../services/splits");

router.get("/", function (req, res, next) {
	const params = {
		year: req.params.year,
		month: req.params.month,
	};

	try {
		res.json(splits.getByMonth(params, req.query.ticker));
	} catch (err) {
		console.error(`Error while getting data `, err.message);
		next(err);
	}
});

module.exports = router;
