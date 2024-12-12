import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { fetchSystemData } from "../services/apiCalls";

const Copyright = () => {
  const [systemData, setSystemData] = useState({
    name: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSystemData();
        setSystemData({
          name: data?.name || "Company Name",
        });
      } catch (error) {
        console.error("Failed to fetch system data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Box
        sx={{
          background: "#f6f6f8",
          padding: ".5em 0",
          textAlign: "center",
          marginBottom: { xs: "56px", sm: "56px", md: 0 },
        }}
      >
        <Typography variant="body2" color="rgba(0, 0, 0, 0.6)">
          {systemData.name} © {new Date().getFullYear()}. Devloped By{" "}
          <a href="https://apssoftsd.com">AppSoft</a>.
        </Typography>
      </Box>
    </>
  );
};

export default Copyright;
