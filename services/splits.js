const db = require("../services/db");
const PER_PAGE = 20;

function getByYear(params, page = 1) {
	const { year } = params;

	const offset = (page - 1) * PER_PAGE;
	const data = db.query(
		`SELECT * FROM splits WHERE execution_date >= '${year}-01-01' AND execution_date <= '${year}-12-31' LIMIT ?,?`,
		[offset, PER_PAGE]
	);
	const meta = { page };

	return {
		data,
		meta,
	};
}

function getByQuarter(params, page = 1) {
	const { year, quarter } = params;

	const quarters = {
		q1: {
			start: "01",
			end: "03",
		},
		q2: {
			start: "04",
			end: "06",
		},
		q3: {
			start: "07",
			end: "09",
		},
		q4: {
			start: "10",
			end: "12",
		},
	};

	const offset = (page - 1) * PER_PAGE;
	const data = db.query(
		`SELECT * FROM splits WHERE execution_date >= '${year}-${quarters[quarter].start}-01' AND execution_date <= '${year}-${quarters[quarter].end}-31' LIMIT ?,?`,
		[offset, PER_PAGE]
	);
	const meta = { page };

	return {
		data,
		meta,
	};
}

module.exports = {
	getByYear,
	getByQuarter,
};
