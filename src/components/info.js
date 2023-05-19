import { Box } from "@mui/material";

export default function info(props) {
  return (
    <>
      <Box component="h2" color="inherit" fontSize={45}>
        {props.title}
      </Box>
      <Box
        component="p"
        color="inherit"
        fontSize={25}
        marginTop={-5.5}
        fontFamily="Montserrat, sans-serif"
      >
        {props.subtitle}
      </Box>
    </>
  );
}
