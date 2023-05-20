import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import Title from "./title";
import Info from "./info";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import Copy from "./util/copy";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { stackoverflowDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import React, { useState } from "react";
import { endpoints, sections } from "../app/api";
import { formatted } from "./util/format";

const apiUrl = process.env.REACT_APP_API_URL;

const specialWordStyle = {
  color: "#f9b31f",
  fontFamily: "monospace",
};

function APISection(props) {
  return (
    <>
      <Box
        component="h3"
        color="inherit"
        fontSize={25}
        marginTop={5}
        marginBottom={1}
      >
        {props.title}
      </Box>
      <Divider />
      <Box component="p" color="inherit" fontSize={18}>
        {formatted(props.description, specialWordStyle)}
      </Box>
    </>
  );
}

function APIEndpoint(props) {
  const [open, setOpen] = useState(false);

  return (
    <Box border={1} borderRadius={1} borderColor="search.main" marginBottom={2}>
      <Button
        fullWidth
        color="custom"
        sx={{
          textTransform: "none",
          padding: 2,
          display: "flex",
          alignItems: "center",
          backgroundColor: "search.background",
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
          <Typography color="white" fontWeight="bold" fontSize={17}>
            {props.title}
          </Typography>
          {open ? <ArrowDropUp /> : <ArrowDropDown />}
        </Box>
      </Button>
      <Box display={open ? "block" : "none"}>
        <Divider
          sx={{
            marginBottom: 2,
          }}
        />
        <Box component="p" color="inherit" fontSize={16} paddingLeft={2}>
          {formatted(props.description, specialWordStyle)}
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          paddingLeft={2}
          borderRadius={1.5}
        >
          <Chip
            size="small"
            label="GET"
            color="success"
            sx={{
              fontWeight: "bold",
              fontSize: 14,
            }}
          />
          <Typography
            component="p"
            marginLeft={1}
            color="custom.main"
            fontSize={16}
          >
            {apiUrl + props.route}
          </Typography>
        </Box>
        <Divider
          sx={{
            marginTop: 2,
          }}
        />
        <Typography
          component="h1"
          fontWeight="bold"
          fontSize={18}
          padding={2}
        >
          Example Response
        </Typography>
        <Box component="div" position="relative" padding={2} marginTop={-4}>
          <Copy
            text={JSON.stringify(props.response, null, 4)}
            sx={{
              position: "absolute",
              right: 25,
              top: 40,
              zIndex: 1,
            }}
          />
          <SyntaxHighlighter
            lineProps={{
              style: {
                wordBreak: "break-all",
                whiteSpace: "pre-wrap",
              },
            }}
            language="json"
            style={stackoverflowDark}
          >
            {JSON.stringify(props.response, null, 4)}
          </SyntaxHighlighter>
        </Box>
      </Box>
    </Box>
  );
}

export default function API() {
  return (
    <Container maxWidth="xl">
      <Title />
      <Info
        title="API"
        subtitle="Documentation on how to use the Torch API in your project"
      />
      {sections.map((section) => (
        <APISection
          key={section.title}
          title={section.title}
          description={section.description}
        />
      ))}
      <Info
        title="Endpoints"
        subtitle="A list of all the endpoints available in the Torch API"
      />
      {endpoints.map((endpoint) => (
        <APIEndpoint
          key={endpoint.title}
          title={endpoint.title}
          route={endpoint.route}
          example={endpoint.example}
          description={endpoint.description}
          response={endpoint.response}
        />
      ))}
    </Container>
  );
}
