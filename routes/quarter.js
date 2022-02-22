const express = require("express");
const router = express.Router({ mergeParams: true });
const splits = require("../services/splits");

router.get("/", function (req, res, next) {
	const params = {
		year: req.params.year,
		quarter: req.params.quarter,
	};

	try {
		res.json(splits.getByQuarter(params, req.query.page));
	} catch (err) {
		console.error(`Error while getting data `, err.message);
		next(err);
	}
});

module.exports = router;
