import arrivalStyles from "../styles/arrivals.module.css";
import styles from "../styles/bestSeller.module.css";
import { Box, Grid } from "@mui/material";
import ShopItem from "./shopItem";

const BestSellers = ({ onAddToCart, onAddToWishlist }) => {
  return (
    <>
      <Grid container className={styles.container}>
        <Grid item xs={12}>
          <div className={arrivalStyles.title}>HOTDEALS</div>
          <div className={arrivalStyles.subtitle}>
            Our Best Selling Products
          </div>
        </Grid>
      </Grid>
      <Grid container className={styles.mainContainer}>
        <Grid item xs={12} md={6} className={styles.leftContainer}>
          <Box
            className={styles.leftImage}
            component="img"
            src="/images/bestseller.jpg"
          />
          <Grid container item xs={12} className={styles.leftText}>
            <Grid item xs={12} className={styles.leftTextSubtitle}>
              FEATURED PRODUCT
            </Grid>
            <Grid item xs={12} className={styles.leftTextTitle}>
              PRODUCT NAME
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={6} className={styles.rightCont}>
          {/* {arrivals.map((el) => (
            <Grid item xs={12} md={6} key={el._id} className={styles.itemCard}>
              <ShopItem
                productId={el["_id"]}
                name={el.name}
                price={el.variations[0].price}
                variationId={el.variations[0]._id}
                variationCount={el.variations.length}
                discountedPrice={el.variations[0].discountedPrice}
                description={el.description}
                image={el.image}
                altImage={el.imageAlt}
                favorite={false}
                onAddToCart={onAddToCart}
                onAddToWishlist={onAddToWishlist}
                quantity={el.variations[0].quantity}
              />
            </Grid>
          ))} */}
        </Grid>
      </Grid>
    </>
  );
};

export default BestSellers;
