var mysql = require('mysql');

var con = mysql.createConnection({
	host: "bc3fesmygiz7qvs23n98-mysql.services.clever-cloud.com",
	user: "uvcuhldw9vxoipts",
	password: "41JwH6JivRbyMHrsHosJ",
	database: "bc3fesmygiz7qvs23n98"
});

con.connect(function(err) {
  if (err) throw err;
});

module.exports = con;
