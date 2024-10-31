import React from "react";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const InfoSection = () => {
  const infoItems = [
    {
      icon: <LocalShippingIcon sx={{ fontSize: 50, color: "#007bff" }} />,
      title: "Free Deliveries",
      subtitle: "Across The World Above $20",
      description:
        "Auctor neque vitae tempus quam pellentesque nec nam aliquam sem.",
    },
    {
      icon: <AutorenewIcon sx={{ fontSize: 50, color: "#007bff" }} />,
      title: "Easy Returns",
      subtitle: "Return Within 10 Days",
      description:
        "Egestas purus viverra accumsan in nisl nisi scelerisque eu.",
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: 50, color: "#007bff" }} />,
      title: "Customer Support",
      subtitle: "Online Customer Support",
      description: "Dui accumsan sit amet nulla facilisi morbi tempus iaculis.",
    },
  ];

  return (
    <Box sx={{}}>
      <Grid container spacing={4} justifyContent="space-between">
        {infoItems.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card
              elevation={0}
              sx={{
                textAlign: "left",
                padding: 3,
                borderRadius: 2,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Grid md={3}>
                <Box sx={{}}>{item.icon}</Box>
              </Grid>
              <Grid md={9}>
                <Box>
                  <Typography
                    variant="p"
                    fontSize={"10px"}
                    color={"#1e1e1e"}
                    sx={{
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: "50%",
                        marginLeft: "1em",
                        transform: "translateY(-50%)",
                        width: "150px",
                        height: "2px",
                        backgroundColor: "#2189ff",
                      },
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, mt: 1 }}>
                    {item.subtitle}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mt: 1 }}
                  >
                    {item.description}
                  </Typography>
                </Box>
              </Grid>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default InfoSection;
