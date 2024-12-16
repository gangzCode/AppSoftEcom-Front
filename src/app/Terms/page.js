import { Container, Typography, Box, Paper } from "@mui/material";

function TermsPage() {
  return (
    <Container maxWidth="lg" sx={{ marginY: 8 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 6 },
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: "#1e1e1e",
            mb: 4,
            textAlign: { xs: "left", md: "center" },
          }}
        >
          Terms and Conditions
        </Typography>

        <Box
          sx={{
            mb: 4,
            p: { xs: 2, md: 4 },
            backgroundColor: "white",
            borderRadius: 1,
            boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "#2189ff",
              fontWeight: 500,
            }}
          >
            1. Acceptance of Terms
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              color: "#455162",
              lineHeight: 1.7,
            }}
          >
            By accessing and using this website, you accept and agree to be
            bound by the terms and provision of this agreement.
          </Typography>
        </Box>

        <Box
          sx={{
            mb: 4,
            p: { xs: 2, md: 4 },
            backgroundColor: "white",
            borderRadius: 1,
            boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "#2189ff",
              fontWeight: 500,
            }}
          >
            2. Privacy Policy
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              color: "#455162",
              lineHeight: 1.7,
            }}
          >
            Please refer to our Privacy Policy for information about how we
            collect, use, and share your information.
          </Typography>
        </Box>

        <Box
          sx={{
            mb: 4,
            p: { xs: 2, md: 4 },
            backgroundColor: "white",
            borderRadius: 1,
            boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "#2189ff",
              fontWeight: 500,
            }}
          >
            3. Products and Services
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              color: "#455162",
              lineHeight: 1.7,
            }}
          >
            All products and services are subject to availability. Prices and
            specifications are subject to change without notice.
          </Typography>
        </Box>

        <Box
          sx={{
            mb: 4,
            p: { xs: 2, md: 4 },
            backgroundColor: "white",
            borderRadius: 1,
            boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "#2189ff",
              fontWeight: 500,
            }}
          >
            4. User Accounts
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              color: "#455162",
              lineHeight: 1.7,
            }}
          >
            You are responsible for maintaining the confidentiality of your
            account and password. You agree to accept responsibility for all
            activities that occur under your account.
          </Typography>
        </Box>

        <Box
          sx={{
            mb: 4,
            p: { xs: 2, md: 4 },
            backgroundColor: "white",
            borderRadius: 1,
            boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              color: "#2189ff",
              fontWeight: 500,
            }}
          >
            5. Intellectual Property
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              color: "#455162",
              lineHeight: 1.7,
            }}
          >
            All content included on this site is the property of our company and
            protected by copyright laws.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default TermsPage;
