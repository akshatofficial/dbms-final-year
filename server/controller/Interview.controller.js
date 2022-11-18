const connection = require("../database");
const dateConverter = require("../utils/DateConverter");
class Interviews {
  async getApplicationTestsHandler(req, res) {
    let sql = "select * from application_test";
    connection.query(sql, function (err, results) {
      if (err) throw err;
      res.send(results);
    });
  }

  async getInterviewsHandler(req, res) {
    // let sql = "select * from interview";
    let sql =
      "select i.application_id as application_id, i.start_time as start_time, i.end_time as end_time, inte.pass as pass from interview i, interview_note inte where inte.interview_id = i.Id;";
    connection.query(sql, function (err, results) {
      if (err) throw err;
      console.log(results);
      res.send(results);
    });
  }

  async addApplicationTestHandler(req, res) {
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

    // Checking for the correct range of score
    const score = parseInt(formData.score);
    if (score < 0 || score > 100)
      return res.status(403).send("Please enter a valid score");

    let sql = `insert into application_test(application_id, start_time, end_time, score) values (${
      formData.application_id
    }, "${dateConverter(formData.start_time)}", "${dateConverter(
      formData.finish_time
    )}", ${formData.score});`;
    connection.query(sql, function (err, results) {
      if (err) throw err;
      res.send("success");
    });
  }

  async addInterviewHandler(req, res) {
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

    let sql = `insert into interview(application_id, start_time, end_time) values (${formData.application_id}, "${dateConverter(formData.start_time)}", "${dateConverter(formData.end_time)}");`;
    connection.query(sql, function (err, results) {
      if (err) throw err;
      res.send("success");
    });
  }

  async deleteApplicationTestHandler(req, res) {
    const formData = req.body;
    const id = formData.id;

    if (Boolean(id) == true) {
      let sql = `delete from application_test where Id=${id}`;
      connection.query(sql, function (err, results) {
        if (err) throw err;
        res.send("success");
      });
    } else {
      return res.status(404).send("Id is required!");
    }
  }

  async deleteInterviewHandler(req, res) {
    const formData = req.body;
    const id = formData.id;

    if (Boolean(id) == true) {
      let sql = `delete from interview where Id=${id}`;
      connection.query(sql, function (err, results) {
        if (err) throw err;
        res.send("success");
      });
    } else {
      return res.status(404).send("Id is required!");
    }
  }

  async EditApplicationTesthandler(req, res) {
    const formData = req.body;

    if (Object.keys(formData).length == 0) {
      return res.status(404).send("Nothing to edit!");
    }

    const id = formData.Id;
    if (Boolean(id) == false) {
      return res.status(404).send("Id is required!");
    }

    let keyVal = "";
    Object.keys(formData).forEach((key) => {
      if (key !== "Id") {
        keyVal += `${key} = ${
          formData[key].type === "int"
            ? `${formData[key].val}`
            : `"${formData[key].val}"`
        },`;
      }
    });
    const len = keyVal.length;
    keyVal = keyVal.substring(0, len - 2);

    let sql = `update application_test set ${keyVal} where Id=${id}`;
    connection.query(sql, function (err, results) {
      if (err) throw err;
      res.send("success");
    });
  }
}

module.exports = new Interviews();
