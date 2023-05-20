import { Box, Divider } from "@mui/material";
import React from "react";

const specialWordStyle = {
  color: "#fbd457",
};

export default function Title() {
  return (
    <>
      <Box
        component="p"
        sx={{
          fontSize: "50px",
          fontWeight: "bold",
          marginBottom: "-20px",
          paddingTop: "40px",
        }}
      >
        <Box
          component="span"
          sx={{
            color: "primary.main",
            fontSize: "70px",
            textDecoration: "underline",
          }}
        >
          t
        </Box>
        <Box
          component="span"
          sx={{
            color: "#fbd457",
            fontSize: "60px",
            fontWeight: "bold",
          }}
        >
          orch
        </Box>
      </Box>
      <Box
        component="p"
        fontFamily="Montserrat, sans-serif"
        sx={{
          color: "inherit",
          fontSize: "20px",
          fontWeight: 100,
          marginBottom: "20px",
        }}
      >
        Light up the <span style={specialWordStyle}>dark</span>, easily get the status of your favorite Minecraft servers.
      </Box>
      <Divider
        sx={{
          paddingBottom: "10px",
          marginBottom: "40px",
        }}
      />
    </>
  );
}
