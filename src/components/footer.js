import React from "react";
import { Box, Typography, Grid, IconButton, Link } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#Fff", color: "#233", padding: "40px 20px" }}>
      <Grid container spacing={4}>
        {/* First Section: Logo and Contact Information */}
        <Grid item xs={12} md={2.4}>
          <Box sx={{ marginBottom: "20px" }}>
            <img
              src="https://via.placeholder.com/150" // Replace with your logo URL
              alt="Logo"
              style={{ width: "100%", maxWidth: "150px" }}
            />
          </Box>
          <Typography variant="body1" sx={{ marginBottom: "10px" }}>
            123 Main St, City, Country
          </Typography>
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
          >
            <PhoneIcon sx={{ marginRight: "8px" }} />
            <Typography variant="body1">+1 (234) 567-890</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <EmailIcon sx={{ marginRight: "8px" }} />
            <Typography variant="body1">info@example.com</Typography>
          </Box>
        </Grid>

        <Grid
          gap={"1em"}
          display={"flex"}
          flexDirection={"column"}
          item
          xs={12}
          md={2.4}
        >
          <Link
            fontSize={"20px"}
            underline={"none"}
            color={"#1e1e1e"}
            fontWeight={"600"}
            variant="h6"
          >
            Quick Links
          </Link>
          <Link color={"#1e1e1e"} underline={"none"} variant="h6">
            Home Appliance
          </Link>
          <Link color={"#1e1e1e"} underline={"none"} variant="h6">
            Items
          </Link>
          <Link color={"#1e1e1e"} underline={"none"} variant="h6">
            Items
          </Link>
          <Link color={"#1e1e1e"} underline={"none"} variant="h6">
            Items
          </Link>
        </Grid>

        <Grid item xs={12} md={2.4}>
          {/* Third Section */}
          <Typography color={"#1e1e1e"} variant="h6">
            Follow Us
          </Typography>
          {/* Add social media icons or other content here */}
        </Grid>

        <Grid item xs={12} md={2.4}>
          {/* Fourth Section */}
          <Typography variant="h6">Customer Service</Typography>
          {/* Add customer service information here */}
        </Grid>

        <Grid item xs={12} md={2.4}>
          {/* Fifth Section */}
          <Typography variant="h6">Subscribe to Our Newsletter</Typography>
          {/* Add subscription form or other content here */}
        </Grid>
      </Grid>
      <Box
        sx={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <IconButton
          sx={{ color: "#1e1e1e" }}
          aria-label="Facebook"
          href="https://www.facebook.com"
          target="_blank"
        >
          <Facebook />
        </IconButton>
        <IconButton
          sx={{ color: "#1e1e1e" }}
          aria-label="Twitter"
          href="https://www.twitter.com"
          target="_blank"
        >
          <Twitter />
        </IconButton>
        <IconButton
          sx={{ color: "#1e1e1e" }}
          aria-label="Instagram"
          href="https://www.instagram.com"
          target="_blank"
        >
          <Instagram />
        </IconButton>
        <IconButton
          sx={{ color: "#1e1e1e" }}
          aria-label="LinkedIn"
          href="https://www.linkedin.com"
          target="_blank"
        >
          <LinkedIn />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
