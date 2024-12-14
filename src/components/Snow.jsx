import { Box } from "@mui/material";

const Snow = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        zIndex: 9999,
        overflow: "hidden",
        "&::before, &::after": {
          content: '""',
          position: "fixed",
          top: "-650px",
          left: 0,
          right: 0,
          bottom: 0,
          background: "transparent",
          backgroundImage: `
            radial-gradient(3px 3px at 50px 100px, rgba(0, 115, 255, 0.9), transparent),
            radial-gradient(4px 4px at 150px 200px, rgba(135, 206, 255, 0.8), transparent),
            radial-gradient(2px 2px at 250px 300px, rgba(176, 224, 255, 0.9), transparent),
            radial-gradient(4px 4px at 350px 400px, rgba(0, 115, 255, 0.8), transparent),
            radial-gradient(3px 3px at 450px 500px, rgba(135, 206, 255, 0.9), transparent),
            radial-gradient(3px 3px at 550px 600px, rgba(176, 224, 255, 0.8), transparent),
            radial-gradient(4px 4px at 650px 700px, rgba(0, 115, 255, 0.9), transparent),
            radial-gradient(2px 2px at 750px 800px, rgba(135, 206, 255, 0.8), transparent)
          `,
          backgroundSize: "750px 750px",
          animation: "snow 12s linear infinite",
          filter: "drop-shadow(0 0 3px rgba(0, 115, 255, 0.5))",
        },
        "&::after": {
          animationName: "snowTwo",
          animationDuration: "8s",
          backgroundImage: `
            radial-gradient(2px 2px at 100px 150px, rgba(0, 115, 255, 0.9), transparent),
            radial-gradient(3px 3px at 200px 250px, rgba(135, 206, 255, 0.8), transparent),
            radial-gradient(2px 2px at 300px 350px, rgba(176, 224, 255, 0.9), transparent),
            radial-gradient(4px 4px at 400px 450px, rgba(0, 115, 255, 0.8), transparent),
            radial-gradient(2px 2px at 500px 550px, rgba(135, 206, 255, 0.9), transparent),
            radial-gradient(3px 3px at 600px 650px, rgba(176, 224, 255, 0.8), transparent),
            radial-gradient(3px 3px at 700px 750px, rgba(0, 115, 255, 0.9), transparent),
            radial-gradient(2px 2px at 800px 850px, rgba(135, 206, 255, 0.8), transparent)
          `,
        },
        "@keyframes snow": {
          "0%": { transform: "translateY(0) translateX(-20px)" },
          "50%": { transform: "translateY(325px) translateX(20px)" },
          "100%": { transform: "translateY(650px) translateX(-20px)" },
        },
        "@keyframes snowTwo": {
          "0%": { transform: "translateY(0) translateX(20px)" },
          "50%": { transform: "translateY(325px) translateX(-20px)" },
          "100%": { transform: "translateY(650px) translateX(20px)" },
        },
      }}
    />
  );
};

export default Snow;
