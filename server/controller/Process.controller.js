const connection = require("../database");

class Process {
  async getProcessStepshandler(req, res) {
    let sql = "select * from process_step";
    connection.query(sql, function (err, results) {
      if (err) throw err;
      res.send(results);
    });
  }

  async createProcessStepsHandler(req, res) {
    const formData = req.body;
    let hasError = false;
    for (let key in formData) {
      // console.log(formData[key]);
      if (formData[key] == "") {
        hasError = true;
        break;
      }
    }

    if (hasError == true) {
      res.status(403).send("All fields are required!");
      return;
    }

    let sql = `insert into process_step(process_id, step_id, status, priority) values (${formData.process_id}, ${formData.step_id}, "${formData.status}", ${formData.process_id});`;
    connection.query(sql, function (err, results) {
      if (err) throw err;
      res.send("success");
    });
  }

  async getSteps(req, res) {
    let sql = "select * from Step";
    connection.query(sql, function (err, results) {
      if (err) throw err;
      res.send(results);
    });
  }
}

module.exports = new Process();
