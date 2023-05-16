import {
  Box,
  Divider
} from "@mui/material";

export default function Title() {
  return (
    <>
      <Box
        component="p"
        sx={{
          fontFamily: "Poppins, sans-serif",
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
        sx={{
          color: "inherit",
          fontFamily: "Kanit, sans-serif",
          fontSize: "20px",
          fontWeight: 100,
          marginBottom: "20px",
        }}
      >
        Light up the dark, easily get the status of your favorite Minecraft
        servers.
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
