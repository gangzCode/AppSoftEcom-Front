// import React, { useState } from "react";
// import { Box, Typography, TextField, Button, Grid } from "@mui/material";
// import swal from "sweetalert2"; // Import SweetAlert2
// import { subscribeToNewsApi } from "../services/apiCalls"; // Assuming your API function is in services/apiCalls

// const Newsletter = () => {
//   const [email, setEmail] = useState(""); // State for email input

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value); // Update email state
//   };

//   const handleSubscribe = async () => {
//     if (!email) {
//       swal.fire({
//         icon: "warning",
//         title: "Oops...",
//         text: "Please enter a valid email address!",
//       });
//       return;
//     }

//     try {
//       // Call the subscribe API with the email entered
//       const response = await subscribeToNewsApi(email);
//       swal.fire({
//         icon: "success",
//         title: "Subscribed!",
//         text: "You have successfully subscribed to our newsletter.",
//       });
//       setEmail(""); // Clear email input after successful submission
//     } catch (error) {
//       swal.fire({
//         icon: "error",
//         title: "Subscription Failed!",
//         text: "There was an issue with the subscription. Please try again.",
//       });
//     }
//   };

//   return (
//     <Box
//       sx={{
//         margin: "2em 0 4em",
//         padding: "2em 9em",
//         backgroundColor: "#f5f5f5",
//         borderRadius: "20px",
//       }}
//     >
//       <Grid container spacing={4} alignItems="center">
//         {/* Left Side: Title and Description */}
//         <Grid item xs={12} md={6}>
//           <Typography
//             fontSize={"10px"}
//             fontWeight={"500"}
//             letterSpacing={"2px"}
//             color={"#1e1e1e"}
//             sx={{
//               position: "relative",
//               "&::after": {
//                 content: '""',
//                 position: "absolute",
//                 top: "50%",
//                 marginLeft: "1em",
//                 transform: "translateY(-50%)",
//                 width: "150px",
//                 height: "2px",
//                 backgroundColor: "#2189ff",
//               },
//             }}
//           >
//             NEWSLETTER
//           </Typography>
//           <Typography
//             fontWeight={"700"}
//             variant="h4"
//             component="h1"
//             fontSize={"36px"}
//             marginBottom={"0"}
//             gutterBottom
//           >
//             Sign Up For Our Newsletter
//           </Typography>
//           <Typography variant="body1">
//             Join our mailing list and get 25% off on your next purchase!
//           </Typography>
//         </Grid>

//         {/* Right Side: Email Input and Subscribe Button */}
//         <Grid item xs={12} md={6}>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <TextField
//               variant="outlined"
//               placeholder="Your Email here"
//               fullWidth
//               value={email} // Bind email state to the input field
//               onChange={handleEmailChange} // Update email on input change
//               sx={{
//                 backgroundColor: "#fff",
//                 border: "none",
//                 borderRadius: "30px",
//                 input: {
//                   padding: "13px 20px",
//                 },
//                 "& .MuiOutlinedInput-root": {
//                   borderRadius: "30px",
//                 },
//               }}
//             />
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSubscribe} // Call handleSubscribe on button click
//               sx={{
//                 backgroundColor: "#2189ff",
//                 textTransform: "unset",
//                 fontWeight: "600",
//                 fontSize: "16px",
//                 borderRadius: "30px",
//                 padding: ".7em 2em",
//                 marginLeft: "-9em",
//                 boxShadow: "4.243px 4.243px 10px 0px rgba(30, 30, 30, 0.3)",
//               }}
//             >
//               Subscribe
//             </Button>
//           </Box>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default Newsletter;
