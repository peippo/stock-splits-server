const db = require("../services/db");
const quarters = require("../utils/utils");

function getByYear(params, ticker = "") {
	const { year } = params;

	let query = `SELECT * FROM splits WHERE execution_date >= '${year}-01-01' AND execution_date <= '${year}-12-31'`;

	if (ticker) {
		query += ` AND ticker = '${ticker}'`;
	}

	query += ` ORDER BY execution_date`;

	const data = db.query(query, []);

	return data;
}

function getByQuarter(params, ticker = "") {
	const { year, quarter } = params;

	let query = `SELECT * FROM splits WHERE execution_date >= '${year}-${quarters[quarter]?.start}-01' AND execution_date <= '${year}-${quarters[quarter]?.end}-31'`;

	if (ticker) {
		query += ` AND ticker = '${ticker}'`;
	}

	query += ` ORDER BY execution_date`;

	const data = db.query(query, []);

	return data;
}

function getByMonth(params, ticker = "") {
	let { year, month } = params;

	month = month.length === 1 ? `0${month}` : month;
	let query = `SELECT * FROM splits WHERE execution_date >= '${year}-${month}-01' AND execution_date <= '${year}-${month}-31'`;

	if (ticker) {
		query += ` AND ticker = '${ticker}'`;
	}

	query += `ORDER BY execution_date`;

	const data = db.query(query, []);

	return data;
}

module.exports = {
	getByYear,
	getByQuarter,
	getByMonth,
};
