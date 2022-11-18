const connection = require("../database");
const dateConverter = require("../utils/DateConverter");

class Jobs {
  async getJobsHandler(req, res) {
    let sql =
      "select j.Id, j.name, j.description, j.date_published, j.job_start_date, j.no_of_vacancies, jc.name as job_category, jp.name as job_position, o.name as organization, j.process_id from job j, job_category jc, job_position jp, organization o WHERE j.job_category_id = jc.Id AND j.job_position_id = jp.Id AND j.organization_id = o.Id;";
    connection.query(sql, function (err, results) {
      if (err) throw err;
      res.send(results);
    });
  }

  async getJobCategoryhandler(req, res) {
    let sql = "select Id, name from job_category;";
    connection.query(sql, function (err, results) {
      if (err) throw err;
      res.send(results);
    });
  }

  async getJobPositionHandler(req, res) {
    let sql = "select Id, name from job_position;";
    connection.query(sql, function (err, results) {
      if (err) throw err;
      res.send(results);
    });
  }

  async getOrganizationhandler(req, res) {
    let sql = "select Id, name from organization;";
    connection.query(sql, function (err, results) {
      if (err) throw err;
      res.send(results);
    });
  }

  async addJobHandler(req, res) {
    const formData = req.body;

    let hasError = false;
    for (let key in formData) {
      console.log(formData[key]);
      if (formData[key] == "") {
        hasError = true;
        break;
      }
    }

    if (hasError == true) {
      res.status(403).send("All fields are required!");
      return;
    }

    let sql = `insert into job(name, description, date_published, job_start_date, no_of_vacancies, job_category_id, job_position_id, organization_id, process_id) values ("${
      formData.name
    }", "${formData.description}", "${dateConverter(
      formData.date_published
    )}", "${dateConverter(formData.job_start_date)}", ${Number(
      formData.no_of_vacancies
    )}, ${Number(formData.job_category_id)}, ${Number(
      formData.job_position_id
    )}, ${Number(formData.organization_id)}, ${Number(formData.process_id)});`;
    connection.query(sql, function (err, results) {
      if (err) throw err;
      res.send("success");
    });
  }
}

module.exports = new Jobs();
