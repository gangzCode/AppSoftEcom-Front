import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function ProductDetailAccordian({ title, children }) {
  return (
    <Accordion
      disableGutters
      sx={{
        boxShadow: "none",

        "&:before": {
          display: "none",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="specification-content"
        id="specification-header"
        sx={{
          // backgroundColor: "#f1f1f1",
          borderRadius: 6,
          px: 4,
          py: 1,
          borderStyle: "solid",
          borderWidth: 3,
          borderColor: "grey.300",

          "&.Mui-expanded": {
            backgroundColor: "#f1f1f1",
            // marginY: "12px",
          },
          "&:hover": {
            backgroundColor: "#f1f1f1",
            // marginY: "12px",
          },
          "&.MuiAccordionSummary-expandIconWrapper ": {
            "&.Mui-expanded": {
              transform: "none",
            },
          },
        }}
      >
        <Typography variant="h6" fontWeight={500}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ bgcolor: "#e9e9e9", borderRadius: 6, p: 4, mt: 2 }}>
        {/* Product Category */}
        {children}
      </AccordionDetails>
    </Accordion>
  );
}

export default ProductDetailAccordian;
