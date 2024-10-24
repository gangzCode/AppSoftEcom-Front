import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Grid,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const TabSection = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Sample data for the tabs
  const items = [
    {
      id: 1,
      image: "https://via.placeholder.com/100", // Replace with your image URL
      title: "Item 1",
      price: "$19.99",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/100", // Replace with your image URL
      title: "Item 2",
      price: "$29.99",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/100", // Replace with your image URL
      title: "Item 3",
      price: "$39.99",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/100", // Replace with your image URL
      title: "Item 4",
      price: "$49.99",
    },
    {
      id: 5,
      image: "https://via.placeholder.com/100", // Replace with your image URL
      title: "Item 5",
      price: "$59.99",
    },
    {
      id: 6,
      image: "https://via.placeholder.com/100", // Replace with your image URL
      title: "Item 6",
      price: "$69.99",
    },
    {
      id: 7,
      image: "https://via.placeholder.com/100", // Replace with your image URL
      title: "Item 7",
      price: "$79.99",
    },
    {
      id: 8,
      image: "https://via.placeholder.com/100", // Replace with your image URL
      title: "Item 8",
      price: "$89.99",
    },
    {
      id: 9,
      image: "https://via.placeholder.com/100", // Replace with your image URL
      title: "Item 9",
      price: "$99.99",
    },
  ];

  return (
    <Box sx={{ width: "100%", padding: "20px" }}>
      <Tabs value={value} onChange={handleChange} variant="fullWidth">
        <Tab label="Tab 1" />
        <Tab label="Tab 2" />
        <Tab label="Tab 3" />
      </Tabs>

      {/* Tab Panels */}
      {Array.from({ length: 3 }).map((_, index) => (
        <Box
          role="tabpanel"
          hidden={value !== index}
          key={index}
          sx={{ marginTop: "20px" }}
        >
          {value === index && (
            <Grid container spacing={2}>
              {items.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: 2,
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: 100, height: 100, objectFit: "cover" }}
                      image={item.image}
                      alt={item.title}
                    />
                    <CardContent
                      sx={{
                        flex: "1 0 auto",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="h6" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body1" color="textSecondary">
                        {item.price}
                      </Typography>
                      <IconButton
                        sx={{ marginTop: "auto", alignSelf: "flex-end" }}
                      >
                        <ArrowForwardIcon />
                      </IconButton>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default TabSection;
