var connection = require('./connection.js');
/**
 * Handles the Object-Relational Mapping between
 * the JS model and the DB
 * @constructor
 */
var ORM = function() {

	/**
	 * Generates a string of comma delimited escape placeholder characters.
	 *
	 * @param {Number} num - The number of escape placeholder characters which
	 * will be generated in the string.
	 * @return {String} - a string of comma delimited escape placeholder
	 * characters.
	 */
	function escapeValuePlaceholders(num) {
		var arr = [];
		for (var i = 0; i < num; i++) {
			arr.push('?');
		}
		return arr.toString();
	}

	/**
	 * Converts a JSON object of column names and values into a string needed
	 * for an a valid SQL INSERT INTO statment.
	 *
	 * @param {Object} obj - a series of key-value pairs in which each key
	 * corresponds to the column name of a particular table.
	 * @return {String} - each key and value delimited by '='. pairs delimited
	 * by ','
	 */
	function objToSql(obj) {
		var arr = [];
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) {
				arr.push(key + '=' + connection.escape(obj[key]));
			}
		}
		return arr.toString();
	}

	/**
	 * Selects all columns and values from a given table.
	 *
	 * @param {String} tablename - a table within the database
	 * @param {Function} callback - invoked after the query to the database.
	 * Upon success, callback is invoked as callback(null, results), where
	 * `results` is an array of row objects. Upon failure, callback is invoked
	 * as callback(error) instead.
	 */
	this.selectAll = function(tablename, callback) {
		var q = 'SELECT * FROM ' + tablename;
		connection.query(q, function(error, results, fields) {
			if (error) return callback(error);
			callback(null, results);
		});
	};

	/**
	 * Inserts a single row into a given table
	 *
	 * @param {String} tablename - a table within the database
	 * @param {String[]} cols - columns within the given table that values will
	 * be inserted into.
	 * @param {String[]} vals - values which will be inserted, corresponding to
	 * the given columns. Escaped before inserted.
	 * @param {Function} callback - invoked after the query to the database.
	 * Upon success, callback is invoked as callback(null, results), where
	 * `results` is an array of row objects. Upon failure, callback is invoked
	 * as callback(error) instead.
	 */
	this.insertOne = function(tablename, cols, vals, callback) {
		var q = 'INSERT INTO ' + tablename
				+ '('
				+ cols.toString()
				+ ')'
				+ 'VALUES ('
				+ escapeValuePlaceholders(vals.length)
				+ ')';
		connection.query(q, [
			vals
		], function(error, results, fields) {
			if(error) return callback(error);
			callback(null, results);
		});
	};

	/**
	 * Updates the columns of a single row in a given table
	 *
	 * @param {String} tablename - a table within the database.
	 * @param {Object} columnValueObj - a series of key-value pairs in which
	 * each key corresponds to the column name of a particular table. Values
	 * will be escaped before updating.
	 * @param {String} condition - used within a `WHERE` clause.
	 * @param {Function} callback - invoked after the query to the database.
	 * Upon success, callback is invoked as callback(null, results), where
	 * `results` is an array of row objects. Upon failure, callback is invoked
	 * as callback(error) instead.
	 */
	this.updateOne = function(tablename, columnValueObj, condition, callback) {
		var q = 'UPDATE ' + tablename
				+ 'SET ' + objToSql(columnValueObj)
				+ 'WHERE ' + connection.escape(condition);
		connection.query(q, function(error, results, fields) {
			if(error) return callback(error);
			callback(null, results);
		});
	};
}

module.exports = ORM;