import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, IconButton, Link } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { Facebook, Instagram, PinDrop } from "@mui/icons-material";
import { fetchSystemData, getTopCategoriesForMenu } from "../services/apiCalls";

const Footer = () => {
  const [systemData, setSystemData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    logo: "",
    fbLink: "",
    instaLink: "",
  });
  const [menus, setmenus] = useState([]);
  const navigate = useNavigate();

  const footerLinks = [
    { name: "Return Policy", path: "#" },
    { name: "Privacy Policy", path: "#" },
    { name: "Terms of Service", path: "/terms" },
    { name: "FAQ", path: "/faq" },
  ];

  const footerUsefulLinks = [
    { name: "Contact Us", path: "/contact" },
    { name: "Track Order", path: "/profile#orders" }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchSystemData();
        setSystemData({
          name: data?.name || "Company Name",
          address: data.address,
          phone: data?.phone || "+1 (234) 567-890",
          email: data?.email || "info@example.com",
          logo: data?.logo,
          fbLink: data?.fb_link,
          instaLink: data?.inst_link,
        });
      } catch (error) {
        console.error("Failed to fetch system data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategoriesMenu = async () => {
      try {
        const response = await getTopCategoriesForMenu();
        setmenus(response.data);
      } catch (error) {
        console.error("Error fetching top categories:", error);
      }
    };

    if (menus.length === 0) {
      fetchCategoriesMenu();
    }

    return () => {};
  }, []);

  return (
    <Box sx={{ backgroundColor: "#fff", color: "#233", padding: "40px 0" }}>
      <Grid container spacing={4}>
        {/* Combined Company Details Grid */}
        <Grid item xs={12} md={4.8}>
          <Box mb={"3em"}>
            <img
              src={systemData.logo}
              alt="Logo"
              style={{ width: "100%", maxWidth: "250px" }}
            />
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "3em" }}
          >
            <PinDrop sx={{ marginRight: "8px" }} />
            <Typography variant="body1">{systemData.address}</Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "3em" }}
          >
            <PhoneIcon sx={{ marginRight: "8px" }} />
            <Typography variant="body1">{systemData.phone}</Typography>
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", marginBottom: "3em" }}
          >
            <EmailIcon sx={{ marginRight: "8px" }} />
            <Typography variant="body1">{systemData.email}</Typography>
          </Box>
        </Grid>

        {/* Policy Information */}
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
            {footerLinks.map((item, index) => (
              <Link
                key={index}
                onClick={() => navigate(item.path)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: "#2189ff",
                  },
                }}
                color={"inherit"}
                underline="none"
              >
                <Typography fontSize={"16px"}>{item.name}</Typography>
              </Link>
            ))}
          </Grid>
        </Grid>

        {/* About Us */}
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
            {menus.map((item, index) => (
              <RouterLink
                key={index}
                to={`/products/${item.id}`}
                color={"inherit"}
                underline="none"
              >
                <Typography fontSize={"16px"}>{item.name}</Typography>
              </RouterLink>
            ))}
          </Grid>
        </Grid>

        {/* Useful Links */}
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
          <Grid gap={"1.7em"} display={"flex"} flexDirection={"column"}>
            {footerUsefulLinks.map((item, index) => (
              <Link
                key={index}
                onClick={() => navigate(item.path)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: "#2189ff",
                  },
                }}
                color={"inherit"}
                underline="none"
              >
                <Typography fontSize={"16px"}>{item.name}</Typography>
              </Link>
            ))}
          </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-start" }}>
        {systemData.fbLink && (
          <IconButton
            sx={{ color: "#1e1e1e" }}
            aria-label="Facebook"
            href={systemData.fbLink}
            target="_blank"
          >
            <Facebook />
          </IconButton>
        )}
        {systemData.instaLink && (
          <IconButton
            sx={{ color: "#1e1e1e" }}
            aria-label="Instagram"
            href={systemData.instaLink}
            target="_blank"
          >
            <Instagram />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default Footer;
