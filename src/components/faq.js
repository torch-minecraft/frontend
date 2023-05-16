import { Box, Button, Stack, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import HelpIcon from '@mui/icons-material/Help';
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

function FaqSection(props) {
  const { question, answer } = props;
  const [open, setOpen] = useState(false);

  return (
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
          <HelpIcon />
          <Typography color="white" fontWeight="bold">
            {question}
          </Typography>
        </Stack>
        {open ? <ArrowDropUp /> : <ArrowDropDown />}
      </Box>
    </Button>
  );
}

export default function Faq() {
  return <Container maxWidth="xl"></Container>;
}
