import {
  ArrowDropDown,
  ArrowDropUp,
  CheckCircle,
  Help,
  Info,
} from "@mui/icons-material";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import { questions } from "../app/faq";
import Title from "./title";
import InfoSection from "./info";

function FaqSection(props) {
  const { question, answer } = props;
  const [open, setOpen] = useState(false);

  return (
    <Box border={1} borderRadius={1} borderColor="search.main" marginBottom={2}>
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
          <Typography color="white" fontWeight="bold">
            {question}
          </Typography>
          {open ? <ArrowDropUp /> : <ArrowDropDown />}
        </Box>
      </Button>
      <Box
        display={open ? "flex" : "none"}
        padding={2}
        alignItems="center"
        borderTop={1}
        borderColor="search.main"
      >
        {answer}
      </Box>
    </Box>
  );
}

export default function Faq() {
  return (
    <Container maxWidth="xl">
      <Title />
      <InfoSection
        title="FAQ"
        subtitle="A collection of answers to commonly asked questions"
      />
      {questions.map((question) => (
        <FaqSection question={question.question} answer={question.answer} />
      ))}
    </Container>
  );
}
