import { Box, Button, Container, Divider } from "@mui/material";

export default function Footer() {
  return (
    <Container maxWidth="xl">
      <Divider
        sx={{
          marginTop: 10,
          marginBottom: 2,
        }}
      />
      <Box display="flex" justifyContent="space-between">
        <Box
          component="p"
          sx={{
            color: "inherit",
            fontFamily: "Poppins, sans-serif",
            fontSize: "15px",
          }}
        >
          Made with ❤️ by Tyrus Chuang
        </Box>
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          href="https://github.com/torch-minecraft/frontend"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            padding: "0px 10px",
            marginBottom: "15px",
            fontSize: "13px",
          }}
        >
          View Source
        </Button>
      </Box>
      <Box marginBottom={10} />
    </Container>
  );
}
