const connection = require("../database");

class Query {
  async getDataFromQuery(req, res) {
    const query = req.query.queryPoint;
    // console.log(query);
    let sql = query;
    connection.query(sql, function (err, results) {
      if (err) throw err;
      res.send(results);
    });
  }
}

module.exports = new Query();
