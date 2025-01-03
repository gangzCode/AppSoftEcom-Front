import React, { useState, useEffect } from "react";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import { getTermsCondition } from "../../services/apiCalls";

function TermsPage() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await getTermsCondition();
        setContent(response.data.content);
      } catch (error) {
        console.error("Error fetching terms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ marginY: 8 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Terms and Conditions
      </Typography>
      <Box
        dangerouslySetInnerHTML={{ __html: content }}
        sx={{
          "& p": { mb: 2 },
          "& strong": { fontWeight: 600 },
        }}
      />
    </Container>
  );
}

export default TermsPage;
