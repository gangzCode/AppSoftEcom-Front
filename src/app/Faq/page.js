import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  Paper,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getFaqs } from "../../services/apiCalls";

function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await getFaqs();
        setFaqs(response.data || []);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
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
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 6 },
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: "#1e1e1e",
            mb: 2,
            textAlign: { xs: "left", md: "center" },
          }}
        >
          Frequently Asked Questions
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#666",
            mb: 4,
            textAlign: { xs: "left", md: "center" },
          }}
        >
          Find answers to common questions about our products and services
        </Typography>
      </Paper>

      <Box sx={{ mb: 4 }}>
        {faqs?.map((faq, faqIndex) => (
          <Accordion
            key={faqIndex}
            disableGutters
            elevation={0}
            sx={{
              border: "1px solid #E0E0E0",
              borderRadius: "8px !important",
              mb: 2,
              "&:before": { display: "none" },
              "&:hover": {
                borderColor: "#2189ff",
                transition: "all 0.3s ease",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                padding: 2,
                "& .MuiAccordionSummary-content": {
                  margin: 0,
                },
              }}
            >
              <Typography sx={{ fontWeight: 500, color: "#333" }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                padding: 2,
                backgroundColor: "#f8f9fa",
                color: "#666",
              }}
            >
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}

export default FAQPage;
