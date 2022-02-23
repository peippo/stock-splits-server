const db = require("../services/db");
const PER_PAGE = 20;
const quarters = require("../utils/utils");

function getByYear(params, page = 1, ticker = "") {
	const { year } = params;
	const offset = (page - 1) * PER_PAGE;

	let dataQuery = `SELECT * FROM splits WHERE execution_date >= '${year}-01-01' AND execution_date <= '${year}-12-31'`;
	let countQuery = `SELECT COUNT(*) FROM splits WHERE execution_date >= '${year}-01-01' AND execution_date <= '${year}-12-31'`;

	if (ticker) {
		dataQuery += ` AND ticker = '${ticker}'`;
		countQuery += ` AND ticker = '${ticker}'`;
	}

	dataQuery += ` ORDER BY execution_date LIMIT ?,?`;

	const data = db.query(dataQuery, [offset, PER_PAGE]);
	let count = db.query(countQuery, []);

	count = count[0]["COUNT(*)"];
	const meta = {
		currentPage: parseInt(page),
		totalPages: Math.ceil(count / PER_PAGE),
		count,
	};

	return {
		data,
		meta,
	};
}

function getByQuarter(params, page = 1, ticker = "") {
	const { year, quarter } = params;
	const offset = (page - 1) * PER_PAGE;

	let dataQuery = `SELECT * FROM splits WHERE execution_date >= '${year}-${quarters[quarter].start}-01' AND execution_date <= '${year}-${quarters[quarter].end}-31'`;
	let countQuery = `SELECT COUNT(*) FROM splits WHERE execution_date >= '${year}-${quarters[quarter].start}-01' AND execution_date <= '${year}-${quarters[quarter].end}-31'`;

	if (ticker) {
		dataQuery += ` AND ticker = '${ticker}'`;
		countQuery += ` AND ticker = '${ticker}'`;
	}

	dataQuery += ` ORDER BY execution_date LIMIT ?,?`;

	const data = db.query(dataQuery, [offset, PER_PAGE]);
	let count = db.query(countQuery, []);

	count = count[0]["COUNT(*)"];
	const meta = {
		currentPage: parseInt(page),
		totalPages: Math.ceil(count / PER_PAGE),
		count,
	};

	return {
		data,
		meta,
	};
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

	return {
		data,
	};
}

module.exports = {
	getByYear,
	getByQuarter,
	getByMonth,
};
