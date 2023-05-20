import { Box, Button, Container, Typography } from "@mui/material";
import Title from "./title";

export default function NotFound() {
  return (
    <Container maxWidth="xl">
      <Title />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        margin={15}
      >
        <Typography variant="h2" fontFamily="Poppins" fontSize={35}>
          Oops! Looks like you got lost!
        </Typography>
        <Button
          sx={{
            textTransform: "none",
            margin: 3,
          }}
          variant="outlined"
          size="large"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <Typography
            variant="h2"
            fontFamily="Poppins"
            fontSize={20}
            padding={2}
          >
            Let's get you back home
          </Typography>
        </Button>
      </Box>
    </Container>
  );
}
