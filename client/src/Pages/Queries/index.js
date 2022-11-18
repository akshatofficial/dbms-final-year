import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { buttonQueries } from "../../api";

const queriesToSend = [
  "select a.job_id as Job_Id, o.name as Company_Name, jp.name as Job_Position, count(applicant_id) as no_of_applications from application a, organization o, job j, job_position jp where a.job_id = j.Id AND j.organization_id = o.Id AND j.job_position_id = jp.Id group by job_id;",

  "select inte.pass as Final_Verdict, a.Id as Application_Id, ap.first_name as First_Name, ap.last_name as Last_Name from application a, interview i, interview_note inte, applicant ap where inte.interview_id = i.Id AND i.application_id = a.Id AND a.applicant_id = ap.Id;",

  "select inte.pass as Final_Verdict, a.Id as Application_Id, ap.first_name as First_Name, ap.last_name as Last_Name from application a, interview i, interview_note inte, application_test apt, applicant ap where a.applicant_id = ap.Id AND inte.interview_id = i.Id AND i.application_id = a.Id AND apt.application_id = a.Id AND apt.score >= 80 AND inte.pass = 1;",

  "select ap.first_name as Applicant_First_Name, ap.last_name as Application_Last_Name, i.start_time as Interview_Start_Time, i.end_time as Interview_End_Time, apt.start_time as Test_Start_Time, apt.end_time as Test_End_Time from application_test apt, applicant ap, application a, interview i where ap.Id = a.applicant_id AND i.application_id = a.Id AND apt.application_id = a.Id order by Applicant_First_Name;",

  "select jc.name as Job_Category, count(j.Id) as Jobs from job_category jc, job j where j.job_category_id = jc.Id group by j.job_category_id;",

  "select ap.first_name as First_Name, ap.last_name as last_name, o.name as Company, jp.name as Job_Position from applicant ap, application a, job j, job_position jp, organization o, interview i, interview_note inte, application_test apt where apt.score >= 80 AND inte.pass = 1 and inte.interview_id = i.Id and apt.application_id = a.Id and i.application_id = a.Id and a.applicant_id = ap.Id and a.job_id = j.Id and jp.Id = j.job_position_id and o.Id = j.organization_id;",
];

const Queries = () => {
  const buttonNames = [
    { name: "No of applications", query: queriesToSend[0] },
    { name: "Interview status", query: queriesToSend[1] },
    { name: "Final verdict", query: queriesToSend[2] },
    { name: "Interview and Test Timings", query: queriesToSend[3] },
    { name: "No. of jobs", query: queriesToSend[4] },
    { name: "Final Job details", query: queriesToSend[5] },
    // { name: "query 7", query: queriesToSend[6] },
    // { name: "query 8", query: queriesToSend[7] },
  ];

  const [loader, setLoader] = useState(false);
  const [jsonData, setJsonData] = useState({});
  const [clickId, setClickId] = useState(null);

  const handleClick = async (queryToPass) => {
    setLoader(true);

    try {
      const { data } = await buttonQueries(queryToPass);
      setJsonData(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    var el_down = document.getElementById("JSON_DOWN");
    // console.log(jsonData);
    el_down.innerHTML = JSON.stringify(jsonData, undefined, 4);
  }, [jsonData]);

  return (
    <Box component={"main"} sx={{ p: 7 }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        alignItems={"center"}
        justifyItems="center"
      >
        {buttonNames.map((item, key) => {
          return (
            <Grid item xs={2} sm={4} md={4}>
              <Button
                key={key}
                onClick={async () => {
                  setClickId(key);
                  await handleClick(item.query);
                  //   await handleJson();
                }}
                disabled={key === clickId && loader}
                variant="contained"
                color="primary"
              >
                {key === clickId && loader ? (
                  <CircularProgress size={24} color={"error"} />
                ) : (
                  `${item.name}`
                )}
              </Button>
            </Grid>
          );
        })}
      </Grid>
      <Paper
        sx={{
          height: "600px",
          overflow: "scroll",
          marginTop: "12px",
        }}
        elevation={10}
      >
        <div style={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: "24px", letterSpacing: "1.3px" }}>Raw JSON Data From API</Typography>
        </div>
        <pre id="JSON_DOWN" className="jsonStyle"></pre>
      </Paper>
    </Box>
  );
};

export default Queries;
