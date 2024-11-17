import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Link } from "@mui/material";
import { ArrowRightAlt, ChevronRight, ExpandMore } from "@mui/icons-material";
import { getPromotions } from "../services/apiCalls";

const HomeBetweenBanner = () => {
  // const sections = [
  //   {
  //     image: "https://placehold.co/600x400",
  //     text: "Get Special Offers on Key Boards",
  //     link: "#",
  //   },
  //   {
  //     image: "https://placehold.co/600x400",
  //     text: "25% Flat Offers on Smart Phones",
  //     link: "#",
  //   },
  //   {
  //     image: "https://placehold.co/600x400",
  //     text: "Third Section",
  //     link: "#",
  //   },
  // ];

  const [promotions, setpromotions] = useState([]);

  useEffect(() => {
    const fetchGetPromotions = async () => {
      try {
        const response = await getPromotions();
        setpromotions(response.data);
        console.log("Featured ::::: ", response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (promotions.length === 0) {
      fetchGetPromotions();
    }
  }, []);

  return (
    <Grid container paddingY={"3em"} spacing={2}>
      {promotions
        .filter((promo) => promo.type === "Home")
        .map((promo, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Box
              sx={{
                position: "relative",
                backgroundImage: `url(${promo.image})`,
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
                  {promo.title}
                </Typography>
                <Link
                  href={promo.link}
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
