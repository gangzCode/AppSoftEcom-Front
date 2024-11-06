import { Box, Typography } from "@mui/material";

const Copyright = () => {
  return (
    <>
      <Box
        sx={{
          background: "#f6f6f8",
          padding: ".5em 0",
          textAlign: "center",
        }}
      >
        <Typography variant="body2" color="rgba(0, 0, 0, 0.6)">
          © {new Date().getFullYear()} Company Name. All rights reserved.
        </Typography>
      </Box>
    </>
  );
};

export default Copyright;
