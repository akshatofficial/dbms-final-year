const connection = require("../database");
const ApplicationUtils = require("../utils/ApplicationUtils");

class Applications {
  async getApplicants(req, res) {
    let sql = "select * from applicant";
    connection.query(sql, function (err, results) {
      if (err) throw err;
      res.send(results);
    });
  }

  async createApplicant(req, res) {
    let formData = req.body;

    let hasError = false;
    for (let key in formData) {
      if (formData[key] == "") {
        hasError = true;
        break;
      }
    }

    if (hasError == true) {
      res.status(403).send("All fields are required!");
      return;
    }

    if (!ApplicationUtils.PhoneNoChecker(formData["phone"])) {
      res.status(403).send("Not a valid phone number!");
      return;
    }

    if (!ApplicationUtils.EmailChecker(formData["email"])) {
      res.status(403).send("Not a valid email!");
      return;
    }

    let sql = `insert into applicant(first_name, last_name, email, phone, summary) values ("${formData.first_name}", "${formData.last_name}", "${formData.email}", "${formData.phone}", "${formData.summary}");`;
    connection.query(sql, function (err, results) {
      if (err) throw err;
      res.send("success");
    });
  }

  async getApplications(req, res) {
    let sql = "select * from application";
    connection.query(sql, function (err, results) {
      if (err) throw err;
      res.send(results);
    });
  }
}

module.exports = new Applications();
