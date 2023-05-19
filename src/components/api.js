import { Box, Container } from "@mui/material";
import Title from "./title";
import Info from "./info";

export default function API() {
  return (
    <Container maxWidth="xl">
      <Title />
      <Info title="API" subtitle="Information about how to use the Torch API" />
    </Container>
  );
}
