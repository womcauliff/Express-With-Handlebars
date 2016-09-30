var connection = require('./connection.js');

var ORM = function() {

	this.selectAll = function(tablename) {
		connection.query('SELECT * FROM ??', [tablename], function(error, results, fields) {
			if (error) throw error;
			return results;
		});
	};

	this.insertOne = function(tablename, rowobject) {
		connection.query("INSERT INTO ?? SET ??", [
			tablename, 
			rowobject
		], function(error, results) {
			if(error) throw error;
			return results;
		});
	};

	this.updateOne = function(tablename, rowobject, valueobject) {
		connection.query("UPDATE ? SET ? WHERE ?", [
			tablename,
			rowobject,
			valueobject
		], function(error, results, fields) {
			if (error) throw error;
			return results;
		});
	};
}

module.exports = ORM;