import React from "react";
import { Box, Grid, Typography, Link } from "@mui/material";
import { ArrowRightAlt, ChevronRight, ExpandMore } from "@mui/icons-material";

const ShopNow = () => {
  // Array of images and content for each section
  const sections = [
    {
      image: "https://placehold.co/600x400", // Replace with your image URL
      text: "Get Special Offers on Key Boards",
      link: "#",
    },
    {
      image: "https://placehold.co/600x400", // Replace with your image URL
      text: "25% Flat Offers on Smart Phones",
      link: "#",
    },
    {
      image: "https://placehold.co/600x400", // Replace with your image URL
      text: "Third Section",
      link: "#",
    },
  ];

  return (
    <Grid container paddingY={"3em"} spacing={2}>
      {sections.map((section, index) => (
        <Grid item xs={12} md={4} key={index}>
          <Box
            sx={{
              position: "relative",
              backgroundImage: `url(${section.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "300px", // Adjust height as necessary
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px", // Rounded corners
              overflow: "hidden", // To ensure rounded corners display correctly
            }}
          >
            {/* Text and Link overlay */}
            <Box
              sx={{
                position: "absolute",
                backgroundColor: "rgba(0, 0, 0, 0)", // Semi-transparent background
                color: "white",
                padding: "5em",
                textAlign: "center",
                borderRadius: "10px",
                textAlign: "right",
              }}
            >
              <Typography
                variant="h5"
                fontWeight={"700"}
                color={"#1e1e1e"}
                gutterBottom
              >
                {section.text}
              </Typography>
              <Link
                href={section.link}
                fontWeight={"600"}
                underline="none"
                color="#2189ff"
              >
                Shop Now <ChevronRight />
              </Link>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default ShopNow;
