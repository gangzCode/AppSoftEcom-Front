import React from "react";
import { Box, Grid, Typography, Link } from "@mui/material";
import { ArrowRightAlt, ChevronRight, ExpandMore } from "@mui/icons-material";

const HomeBetweenBanner = () => {
  const sections = [
    {
      image: "https://placehold.co/600x400",
      text: "Get Special Offers on Key Boards",
      link: "#",
    },
    {
      image: "https://placehold.co/600x400",
      text: "25% Flat Offers on Smart Phones",
      link: "#",
    },
    {
      image: "https://placehold.co/600x400",
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
              height: "300px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                backgroundColor: "rgba(0, 0, 0, 0)",
                color: "white",
                padding: "5em",
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

export default HomeBetweenBanner;
