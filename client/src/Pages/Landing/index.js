import { Box } from "@mui/system";
import React from "react";
import img from "../../assets/landing-page-img.webp";

const Landing = () => {
  return (
    <Box component={"main"} sx={{ p: 7 }}>
      <div className="landing-container">
        <div className="landing-desc">
          Welcome to our Job Registration Portal. Make your job search easy when
          layoffs are happening.
        </div>
        <div className="landing-img">
          <img src={img} alt="Landing Image" height={600} width={"80%"} />
        </div>
      </div>
    </Box>
  );
};

export default Landing;
