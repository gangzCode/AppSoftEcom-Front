import React from "react";
import { Box, Typography, Grid, IconButton, Link } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Facebook, Instagram, LinkedIn, PinDrop, Twitter } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: "#fff", color: "#233", padding: "40px 20px" }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={2.4}>
          <Box mb={"3em"}>
            <img
              src="https://placehold.co/295x56"
              alt="Logo"
              style={{ width: "100%", maxWidth: "250px" }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: "3em" }}>
            <PinDrop sx={{ marginRight: "8px" }} />
            <Typography variant="body1">123 Main St, City, Country</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: "3em" }}>
            <PhoneIcon sx={{ marginRight: "8px" }} />
            <Typography variant="body1">+1 (234) 567-890</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <EmailIcon sx={{ marginRight: "8px" }} />
            <Typography variant="body1">info@example.com</Typography>
          </Box>
        </Grid>

        {/* First Column */}
        <Grid
          item
          xs={12}
          md={2.4}
          sx={{
            position: "relative",
            "&::before": {
              content: "''",
              width: "1px",
              height: "calc(100% - 40px)",
              backgroundColor: "#e6e6e6",
              position: "absolute",
              top: "20px",
              right: "-10px",
            },
          }}
        >
          <Typography mb={"1.4em"} fontWeight={"600"} fontSize={"20px"}>
            Know Us
          </Typography>
          <Grid gap={"1.7em"} display={"flex"} flexDirection={"column"}>
            {["Home Appliance", "Kitchen Appliance", "Digital Camera", "Laptops", "Phones"].map(
              (item, index) => (
                <Link key={index} href={"#"} color={"inherit"} underline="none">
                  <Typography fontSize={"16px"}>{item}</Typography>
                </Link>
              )
            )}
          </Grid>
        </Grid>

        {/* Second Column */}
        <Grid
          item
          xs={12}
          md={2.4}
          sx={{
            position: "relative",
            "&::before": {
              content: "''",
              width: "1px",
              height: "calc(100% - 40px)",
              backgroundColor: "#e6e6e6",
              position: "absolute",
              top: "20px",
              right: "-10px",
            },
          }}
        >
          <Typography mb={"1.4em"} fontWeight={"600"} fontSize={"20px"}>
            Policy Information
          </Typography>
          <Grid gap={"1.7em"} display={"flex"} flexDirection={"column"}>
            {["Return Policy", "Privacy Policy", "Terms of Service", "FAQ", "Support"].map(
              (item, index) => (
                <Link key={index} href={"#"} color={"inherit"} underline="none">
                  <Typography fontSize={"16px"}>{item}</Typography>
                </Link>
              )
            )}
          </Grid>
        </Grid>

        {/* Third Column */}
        <Grid
          item
          xs={12}
          md={2.4}
          sx={{
            position: "relative",
            "&::before": {
              content: "''",
              width: "1px",
              height: "calc(100% - 40px)",
              backgroundColor: "#e6e6e6",
              position: "absolute",
              top: "20px",
              right: "-10px",
            },
          }}
        >
          <Typography mb={"1.4em"} fontWeight={"600"} fontSize={"20px"}>
            Know Us
          </Typography>
          <Grid gap={"1.7em"} display={"flex"} flexDirection={"column"}>
            {["About Us", "Our Team", "Careers", "Blog", "News"].map((item, index) => (
              <Link key={index} href={"#"} color={"inherit"} underline="none">
                <Typography fontSize={"16px"}>{item}</Typography>
              </Link>
            ))}
          </Grid>
        </Grid>

        {/* Fourth Column */}
        <Grid
          item
          xs={12}
          md={2.4}
          sx={{
            position: "relative",
            "&::before": {
              content: "''",
              width: "1px",
              height: "calc(100% - 40px)",
              backgroundColor: "#e6e6e6",
              position: "absolute",
              top: "20px",
              right: "-10px",
            },
          }}
        >
          <Typography mb={"1.4em"} fontWeight={"600"} fontSize={"20px"}>
            Useful Links
          </Typography>
          <Grid gap={"1.7em"} display={"flex"} flexDirection={"column"}>
            {["Contact Us", "Help", "Shipping Info", "Track Order", "Sitemap"].map((item, index) => (
              <Link key={index} href={"#"} color={"inherit"} underline="none">
                <Typography fontSize={"16px"}>{item}</Typography>
              </Link>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Social Media Icons */}
      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-start" }}>
        <IconButton sx={{ color: "#1e1e1e" }} aria-label="Facebook" href="https://www.facebook.com" target="_blank">
          <Facebook />
        </IconButton>
        <IconButton sx={{ color: "#1e1e1e" }} aria-label="Twitter" href="https://www.twitter.com" target="_blank">
          <Twitter />
        </IconButton>
        <IconButton sx={{ color: "#1e1e1e" }} aria-label="Instagram" href="https://www.instagram.com" target="_blank">
          <Instagram />
        </IconButton>
        <IconButton sx={{ color: "#1e1e1e" }} aria-label="LinkedIn" href="https://www.linkedin.com" target="_blank">
          <LinkedIn />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;