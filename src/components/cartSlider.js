import styles from "../styles/userSlider.module.css";
import { Backdrop, Box, CircularProgress, Drawer, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DeleteOutline, ShoppingCartOutlined } from "@mui/icons-material";
//import { deleteFromCart, updateCartApi } from "../services/apiCalls";
import { useSnackbar } from "notistack";
//import NumberInput from "@/components/numberInput";

export default function CartSlider({
    openCart,
    handleClose,
    cartArray,
    onItemDelete,
    onUpdateCart,
  }) {
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [cartData, setCartData] = useState([]);
  
    useEffect(() => {
      setCartData(cartArray);
      let tot = 0;
      cartArray.forEach((value) => {
        if (value.discountedPrice) {
          tot += value.discountedPrice * value.quantity;
        } else {
          tot += value.price * value.quantity;
        }
      });
      setTotal(tot);
    }, [cartArray]);
  
    async function deleteItem(cartId) {
      setLoading(true);
      // deleteFromCart(cartId)
      //   .then(() => {
      //     onItemDelete();
      //     setLoading(false);
      //   })
      //   .catch((err) => {
      //     enqueueSnackbar("Error occurred when deleting item.", { variant: "error" });
      //     setLoading(false);
      //   });
      setLoading(false); // Simulate end of loading
    }
  
    const quantityInc = (itemId) => {
      let updated = [];
      for (let item of cartArray) {
        if (item._id === itemId) {
          if (item.quantity < item.stockSize) {
            item.quantity++;
          } else {
            return;
          }
        }
        updated.push(item);
      }
      updateCart(updated);
    };
    
    const quantityDec = (itemId) => {
      let updated = [];
      for (let item of cartArray) {
        if (item._id === itemId) {
          if (item.quantity === 1) {
            return;
          }
          item.quantity--;
        }
        updated.push(item);
      }
      updateCart(updated);
    };
  
    async function updateCart(updated) {
      // updateCartApi(updated)
      //   .then(() => {
      //     onUpdateCart();
      //   })
      //   .catch(() => {
      //     enqueueSnackbar("Error occurred when updating the cart.", { variant: "error" });
      //   });
    }
  
    return (
      <>
        <Drawer
          anchor={"right"}
          open={openCart}
          onClose={handleClose}
          transitionDuration={500}
        >
          <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
            <CircularProgress style={{ color: "#FF6B6B" }} />
          </Backdrop>
          <div className={styles.closeContainer} onClick={handleClose}>
            <div className={"dropdn-close " + styles.closeIcon}>
              <div></div>
              <div></div>
            </div>
          </div>
  
          <Grid container className={styles.sideCartContainer} display="relative">
            <Grid item xs={12} className={styles.cartItemCont}>
              {cartData.map((el) => (
                <Grid key={el._id} container className={styles.cartItem}>
                  <Grid item xs={4} paddingRight="30px">
                    <a href={`/product/${encodeURIComponent(el.product._id)}`}>
                      <Box
                        component="img"
                        src={el.product.image}
                        className={styles.cartImage + " " + styles.mousePointer}
                      />
                    </a>
                  </Grid>
                  <Grid item xs={7} textAlign="left" position="relative">
                    <a href={`/product/${encodeURIComponent(el.product._id)}`}>
                      <div className={styles.cartItemName + " " + styles.mousePointer}>
                        {el.product.name}
                      </div>
                    </a>
                    <Box>
                      <div className={styles.cartItemBox}>{el.variationDetails.name}</div>
                    </Box>
                    <div className={styles.cartItemQty}>
                      Quantity: <b>{el.quantity}</b>
                    </div>
                    {el.discountedPrice ? (
                      <div className={styles.cartItemAmount}>
                        {el.quantity > 1 && (
                          <div className={styles.cartItemAmountSingle}>
                            (${el.discountedPrice} x {el.quantity})
                          </div>
                        )}
                        ${el.discountedPrice * el.quantity}
                      </div>
                    ) : (
                      <div className={styles.cartItemAmount}>
                        {el.quantity > 1 && (
                          <div className={styles.cartItemAmountSingle}>
                            (${el.price} x {el.quantity})
                          </div>
                        )}
                        ${el.price * el.quantity}
                      </div>
                    )}
                  </Grid>
                  <Grid item xs={1}>
                    <DeleteOutline className={styles.cartIcon} onClick={() => deleteItem(el._id)} />
                  </Grid>
                </Grid>
              ))}
              {(!cartData || cartData.length === 0) && (
                <Grid
                  container
                  spacing={0}
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  style={{ minHeight: "100%" }}
                >
                  <Grid item xs={12}>
                    <ShoppingCartOutlined />
                    <h3 style={{ marginTop: "10px" }}>CART IS EMPTY</h3>
                  </Grid>
                </Grid>
              )}
            </Grid>
            {cartData && cartData.length > 0 && (
              <Grid container className={styles.bottomCont}>
                <Grid item xs={12} className={styles.shippingTip}>
                  <b>FREE SHIPPING!</b> for orders over <b>$100!</b>
                </Grid>
                <Grid item xs={6} className={styles.subTot}>
                  SUBTOTAL
                </Grid>
                <Grid item xs={6} className={styles.subAmount}>
                  ${total}
                </Grid>
                <Grid item xs={12}>
                  <a href="/cart" className={"btn-style-black " + styles.checkoutBtn}>
                    <div className="txt">
                      <ShoppingCartOutlined /> Go to Cart
                    </div>
                  </a>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Drawer>
      </>
    );
  }