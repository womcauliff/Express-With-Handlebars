var connection = require('./connection.js');

var ORM = function() {

	this.selectAll = function(tablename) {
		connection.connect();
		connection.query('SELECT * FROM ??', [tablename], function(error, results, fields) {
			if (error) throw error;
			return results;
		});
		connection.end();
	};

	this.insertOne = function(tablename, rowobject) {
		connection.connect();
		connection.query("INSERT INTO ?? SET ??", [
			tablename, 
			rowobject
		], function(error, results) {
			if(error) throw error;
			return results;
		});
		connection.end();
	};

	this.updateOne = function(tablename, rowobject, valueobject) {
		connection.connect();
		connection.query("UPDATE ? SET ? WHERE ?", [
			tablename,
			rowobject,
			valueobject
		], function(error, results, fields) {
			if (error) throw error;
			return results;
		});
		connection.end();
	};
}

module.exports = ORM;