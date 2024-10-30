import styles from "../styles/footer.module.css";
import {
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  ArrowForwardIosRounded,
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

const information = [
  { value: "Contact Us", link: "/contact_us" },
  { value: "Terms & Conditions", link: "/legal/terms" },
  { value: "Returns & Exchanges", link: "/returns" },
  { value: "Shipping & Delivery", link: "/shipping" },
  { value: "Privacy Policy", link: "/legal/privacy" },
];

const Footer = () => {
  // const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [categoryArray, setCategoryArray] = useState([]);

  useEffect(() => {
    setCategoryArray([
      { _id: "1", name: "Electronics" },
      { _id: "2", name: "Apparel" },
      { _id: "3", name: "Home & Kitchen" },
    ]);
  }, []);

  function subscribeToNews() {
    if (username && username.trim() !== "") {
      let regEmail =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regEmail.test(username)) {
        enqueueSnackbar("Please enter a valid email.", { variant: "error" });
      } else {
        setLoading(true);
        setTimeout(() => {
          enqueueSnackbar("Successfully subscribed to newsletter.", { variant: "success" });
          setUsername("");
          setLoading(false);
        }, 1000);
      }
    } else {
      enqueueSnackbar("Please enter your email.", { variant: "error" });
    }
  }

  // Commented out the routing functions
  // function navigateToProducts(category) {
  //   navigate(`/product?page=1&cat=${category}&catType=C`);
  // }

  return (
    <footer>
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress style={{ color: "#FF6B6B" }} />
      </Backdrop>
      <div className={styles.footerContainer}>
        <Grid container rowGap={4}>
          <Grid item xs={12} md={6} lg={3}>
            <div className={styles.maxWidth}>
              <Box className={styles.logo} component="img" src="/images/logo-loading.png" />
            </div>
            <div className={styles.maxWidth}>
              <PhoneIcon className={styles.icon} />
              <span className={styles.iconText}>
                <a href="tel:+14162919800">+1-416-291-9800</a>
              </span>
            </div>
            <div className={styles.maxWidth}>
              <EmailIcon className={styles.icon} />
              <span className={styles.iconText}>
                <a href="mailto: orders@e-commerce.ca">orders@e-commerce.ca</a>
              </span>
            </div>
            <div className={styles.maxWidth}>
              <LocationOnIcon className={styles.icon} />
              <div className={styles.iconText}>
                5641 Steeles Ave E Unit 3,
                <br /> Scarborough,
                <br /> ON M1V 5P6
              </div>
            </div>
            <div>
              <div>
                <Facebook className={styles.socialIcon + " " + styles.fb} />
                <Instagram className={styles.socialIcon + " " + styles.ig} />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <div className={styles.maxWidth + " " + styles.title}>CATEGORIES</div>
            <List className={styles.paddingZero}>
              {categoryArray.map((el) => (
                <ListItem key={el._id} className={styles.paddingZero}>
                  <ListItemButton className={styles.listItemBtn}>
                    <ListItemIcon className={styles.listItemIcon}>
                      <ArrowForwardIosRounded className={styles.listIcon} />
                    </ListItemIcon>
                    <ListItemText>
                      <span className={styles.listText}>{el.name}</span>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <div className={styles.maxWidth + " " + styles.title}>INFORMATION</div>
            <List className={styles.paddingZero}>
              {information.map((el) => (
                <ListItem key={el.value} className={styles.paddingZero}>
                  <ListItemButton className={styles.listItemBtn}>
                    <ListItemIcon className={styles.listItemIcon}>
                      <ArrowForwardIosRounded className={styles.listIcon} />
                    </ListItemIcon>
                    <ListItemText>
                      <span className={styles.listText}>{el.value}</span>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <div className={styles.maxWidth + " " + styles.title}>SUBSCRIBE NOW</div>
            <div className={styles.maxWidth + " " + styles.subDesc}>
              Subscribe to our newsletter today
            </div>
            <input
              className={styles.footerInput}
              placeholder={"Enter Email Address"}
              type="email"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <span
              className={"btn-style-black " + styles.subBtn}
              onClick={subscribeToNews}
            >
              <div className="txt"> Subscribe Now </div>
            </span>
            <Box className={styles.payments} component="img" src="/images/payment.png" />
          </Grid>
        </Grid>
      </div>
      <div className={styles.footerCopyRight}>
         E-commerce Copyright 2024. Developed by{" "}
        <a href="">Appsoft</a>
      </div>
    </footer>
  );
};

export default Footer;