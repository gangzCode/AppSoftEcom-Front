// import React, { useState } from 'react';
// import {
//   Grid,
//   Typography,
//   IconButton,
//   Box,
//   Stack,
//   Avatar,
//   Button,
//   CircularProgress
// } from '@mui/material';
// import { DeleteOutline, ShoppingCart } from '@mui/icons-material';
// import { addToCart } from '../services/apiCalls';

// const WishlistItem = ({ item, onUpdate }) => {
//   const [loading, setLoading] = useState(false);

//   const handleRemove = async () => {
//     try {
//       setLoading(true);
//       await onUpdate();
//     } catch (error) {
//       console.error("Failed to remove item:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleMoveToCart = async () => {
//     try {
//       setLoading(true);
//       // Add to cart
//       await addToCart({
//         product_id: item.product.id,
//         quantity: "1",
//         variant_id: item.product.variant_id,
//         unit_price: item.product.unit_price
//       });
//       // Remove from wishlist
//       await handleRemove();
//     } catch (error) {
//       console.error("Failed to move item to cart:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Grid container sx={{ mt: 2, pb: 2, borderBottom: "1px solid #ebebeb" }}>
//       <Grid item xs={3}>
//         <Avatar
//           variant="rounded"
//           src={item.product.images[0]}
//           alt={item.product.name}
//           sx={{ width: 70, height: 70 }}
//         />
//       </Grid>
//       <Grid item xs={9} px={1}>
//         <Box sx={{ flexGrow: 1 }} display="flex" flexDirection="column" gap={0.5}>
//           <Typography variant="body1" fontWeight={500} lineHeight={1.5}>
//             {item.product.name}
//           </Typography>
//           <Typography variant="body2" fontWeight={400} fontSize={12}>
//             {item.product.variant}
//           </Typography>
//           <Typography variant="body1" sx={{ mt: 0.5 }}>
//             ${parseFloat(item.product.unit_price).toFixed(2)}
//           </Typography>
//         </Box>
//         <Stack direction="row" alignItems="center" mt={1} gap={2}>
//           <Button
//             variant="contained"
//             size="small"
//             startIcon={<ShoppingCart />}
//             onClick={handleMoveToCart}
//             disabled={loading}
//           >
//             Move to Cart
//           </Button>
//           {loading ? (
//             <CircularProgress size={24} />
//           ) : (
//             <IconButton
//               size="small"
//               onClick={handleRemove}
//               disabled={loading}
//             >
//               <DeleteOutline />
//             </IconButton>
//           )}
//         </Stack>
//       </Grid>
//     </Grid>
//   );
// };

// export default WishlistItem;