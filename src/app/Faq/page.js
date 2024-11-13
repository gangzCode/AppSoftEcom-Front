import React from "react";
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function FAQPage() {
  return (
    <Container sx={{ marginY: 8 }}>
      <Typography variant="h4" gutterBottom>
        Frequently Asked Questions
      </Typography>

      <Accordion
        disableGutters
        elevation={0}
        square
        sx={{
          border: "1px solid #E0E0E0",
          borderRadius: "8px",
          marginBottom: 2,
          "&:before": { display: "none" },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="specification-content"
          id="specification-header"
          sx={{
            paddingY: 1,
            paddingX: 2,
            fontSize: "1rem",
            fontWeight: 500,
            color: "#333",
          }}
        >
          <Typography variant="subtitle1">Specification</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 2, color: "#666" }}>
          <Typography variant="body2">
            Here you can provide detailed specifications of the product,
            including dimensions, materials, and other relevant information.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        disableGutters
        elevation={0}
        square
        sx={{
          border: "1px solid #E0E0E0",
          borderRadius: "8px",
          marginBottom: 2,
          "&:before": { display: "none" },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="shipping-info-content"
          id="shipping-info-header"
          sx={{
            paddingY: 1,
            paddingX: 2,
            fontSize: "1rem",
            fontWeight: 500,
            color: "#333",
          }}
        >
          <Typography variant="subtitle1">Shipping Information</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 2, color: "#666" }}>
          <Typography variant="body2">
            Provide information on shipping methods, delivery times, and any
            shipping fees that may apply.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        disableGutters
        elevation={0}
        square
        sx={{
          border: "1px solid #E0E0E0",
          borderRadius: "8px",
          marginBottom: 2,
          "&:before": { display: "none" },
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="reviews-content"
          id="reviews-header"
          sx={{
            paddingY: 1,
            paddingX: 2,
            fontSize: "1rem",
            fontWeight: 500,
            color: "#333",
          }}
        >
          <Typography variant="subtitle1">Reviews</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ padding: 2, color: "#666" }}>
          <Typography variant="body2">
            Display customer reviews, ratings, and feedback to give potential
            buyers more insight into the product quality.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}

export default FAQPage;
