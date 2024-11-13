import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container sx={{ textAlign: "center", marginY: 10 }}>
      <Typography
        variant="h1"
        sx={{ fontWeight: "bold", fontSize: "6rem", color: "#333" }}
      >
        404
      </Typography>

      <Typography variant="h5" sx={{ marginTop: 2, color: "#555" }}>
        Oops! Page Not Found
      </Typography>

      <Typography variant="body1" sx={{ marginTop: 1, color: "#777" }}>
        The page you are looking for doesn’t exist or has been moved.
      </Typography>

      <Box sx={{ marginTop: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
          sx={{
            paddingX: 3,
            paddingY: 1,
            fontSize: "1rem",
          }}
        >
          Go Back Home
        </Button>
      </Box>
    </Container>
  );
}

export default NotFoundPage;
