import React, { useState } from "react";
import { Box, Typography, IconButton, TextField, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function CartSliderNotes() {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box sx={{ mt: 2, pb: 2, borderBottom: "1px solid #ebebeb" }}>
      <Box>
        {/* Expanded Note Section */}
        <Typography
          onClick={handleExpand}
          fontWeight="bold"
          sx={{
            mb: isExpanded ? 1 : 0,
            transition: "margin-bottom 0.2s ease-in-out, color 0.2s ease-in-out",
            display: "inline-block",
            "&:hover": {
              color: "primary.main",
              cursor: "pointer",
            },
          }}
        >
          Note <EditIcon fontSize="small" sx={{ verticalAlign: "middle" }} />
        </Typography>
        <Box
          sx={{
            bgcolor: "#f3f3f3",
            transition: "max-height 0.2s ease-in-out",
            height: "fit-content",
            maxHeight: isExpanded ? 300 : 0,
            overflowY: "clip",
            px: 2,
          }}
          display={"flex"}
          flexDirection={"column"}
          gap={1}
        >
          <Typography variant="body1" sx={{ mt: 2 }}>
            Special instructions for seller
          </Typography>
          <TextField
            fullWidth
            multiline
            minRows={4}
            maxRows={7}
            variant="outlined"
            // placeholder="Special instructions for seller"
            sx={{
              bgcolor: "#f3f3f3",
              borderRadius: 1,
              mb: 2,
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default CartSliderNotes;
