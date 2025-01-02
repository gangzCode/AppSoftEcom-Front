import React, { useState, useEffect } from "react";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import { getAboutUs } from "../../services/apiCalls";

function AboutUsPage() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await getAboutUs();
        setContent(response.data.content);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ marginY: 8 }}>
      <Typography variant="h4" mb={4} gutterBottom textAlign="center">
        About Us
      </Typography>
      <Box dangerouslySetInnerHTML={{ __html: content }} />
    </Container>
  );
}

export default AboutUsPage;
