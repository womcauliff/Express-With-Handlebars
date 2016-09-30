var ORM = require('../config/orm.js');

/**
 * Model for a Burger Object
 * @constructor
 */
var Burger = function() {
	/**
	 * Returns all burger entries from the database.
	 *
	 * @param {Function} cb - a callback function invoked after results are
	 * retrieved from the database. Upon success, callback is invoked as
	 * callback(null, results), where `results` is an array of row objects. Upon
	 * failure, callback is invoked as callback(error) instead.
	 */
	this.all = function(cb) {
		ORM.selectAll('burgers', function(err, res) {
			if(err) return cb(err);
			cb(null, res);
		});
	}
	/**
	 * Creates a new burger entry in the database.
	 *
	 * @param {String[]} cols - columns within the given table that values will
	 * be inserted into.
	 * @param {String[]} vals - values which will be inserted, corresponding to
	 * the given columns. Escaped before inserted.
	 * @param {Function} cb - a callback function invoked after results are
	 * retrieved from the database. Upon success, callback is invoked as
	 * callback(null, results), where `results` is an array of row objects. Upon
	 * failure, callback is invoked as callback(error) instead.
	 */
	this.create = function(cols, vals, cb) {
		ORM.insertOne('burgers', cols, vals, function(err, res) {
			if(err) return cb(err);
			cb(null, res);
		});
	}
	/**
	 * Updates an existing burger entry in the database.
	 *
	 * @param {Object} columnValueObj - a series of key-value pairs in which
	 * each key corresponds to the column name of a particular table. Values
	 * will be escaped before updating.
	 * @param {String} condition - used within a `WHERE` clause.
	 * @param {Function} cb - a callback function invoked after results are
	 * retrieved from the database. Upon success, callback is invoked as
	 * callback(null, results), where `results` is an array of row objects. Upon
	 * failure, callback is invoked as callback(error) instead.
	 */
	this.update = function(columnValueObj, condition, cb) {
		ORM.updateOne('burgers', columnValueObj, condition, function(err, res) {
			if(err) return cb(err);
			cb(null, res);
		});
	}
}

module.exports = Burger;