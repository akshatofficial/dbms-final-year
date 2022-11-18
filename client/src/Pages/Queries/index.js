import { Box, Button, CircularProgress, Grid } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { buttonQueries } from "../../api";

const queriesToSend = [
  "SELECT j.name,j.no_of_vacancies,jc.name as job_category,jpos.name as job_position,o.name as organization FROM job j,job_category jc,job_position jpos,organization o WHERE j.job_category_id = jc.Id AND j.job_position_id = jpos.Id AND j.organization_id = o.Id;",
];

const Queries = () => {
  const buttonNames = [
    { name: "query 1", query: queriesToSend[0] },
    { name: "query 2", query: queriesToSend[0] },
    { name: "query 3", query: queriesToSend[0] },
    { name: "query 4", query: queriesToSend[0] },
    { name: "query 5", query: queriesToSend[0] },
    { name: "query 6", query: queriesToSend[0] },
    { name: "query 7", query: queriesToSend[0] },
    { name: "query 8", query: queriesToSend[0] },
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
    <Box component={'main'} sx={{ p:7 }}>
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
      <pre id="JSON_DOWN" className="jsonStyle"></pre>
    </Box>
  );
};

export default Queries;
