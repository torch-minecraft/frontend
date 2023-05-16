import { Box, Button, Divider, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { ArrowDropDown, ArrowDropUp, Help, CheckCircle } from "@mui/icons-material";
import Title from "./title";

function FaqSection(props) {
  const { question, answer } = props;
  const [open, setOpen] = useState(false);

  return (
    <Box border={1} borderRadius={1} borderColor="search.main">
      <Button
        fullWidth
        color="custom"
        sx={{
          backgroundColor: "search.background",
          textTransform: "none",
          padding: 2,
          display: "flex",
          alignItems: "center",
        }}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Stack direction="row" spacing={2}>
            <Help
              sx={{
                color: "primary.main",
              }}
            />
            <Typography color="white" fontWeight="bold">
              {question}
            </Typography>
          </Stack>
          {open ? <ArrowDropUp /> : <ArrowDropDown />}
        </Box>
      </Button>
      <Box
        display={open ? "flex" : "none"}
        padding={2}
        alignItems="center"
        backgroundColor="search.background"
        borderTop={1}
        borderColor="search.main"
      >
        <Stack direction="row" spacing={2}>
          <CheckCircle
            sx={{
              color: "primary.main",
            }}
          />
          <Typography color="white">{answer}</Typography>
        </Stack>
      </Box>
    </Box>
  );
}

export default function Faq() {
  return (
    <Container maxWidth="xl">
      <Box component="h2" color="inherit" fontSize={45}>
        FAQ
      </Box>
      <Box
        component="p"
        color="inherit"
        fontSize={25}
        sx={{
          marginTop: -6,
        }}
      >
        A collection of answers to commonly asked questions
      </Box>
      <FaqSection
        question="What is Torch?"
        answer="Torch is a Minecraft server status website. You can search the status of any online Minecraft server, and instantly get relavent information."
      />
    </Container>
  );
}
