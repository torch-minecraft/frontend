import {
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Title from "./title";
import Info from "./info";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import Copy from "./util/copy";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { stackoverflowDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useState } from "react";

function APISection(props) {
  return (
    <>
      <Box
        component="h3"
        color="inherit"
        fontSize={30}
        marginTop={6}
        marginBottom={1}
      >
        {props.title}
      </Box>
      <Divider marginBottom={1} />
      <Box component="p" color="inherit" fontSize={21}>
        {props.description}
      </Box>
    </>
  );
}

function APIEndpoint(props) {
  const { title, body } = props;
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
            {title}
          </Typography>
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
        <Box component="div" position="relative">
          <Copy
            text={JSON.stringify(body, null, 4)}
            sx={{
              position: "absolute",
              right: 11,
              top: 15,
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
            {JSON.stringify(body, null, 4)}
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
      <Info title="API" subtitle="Information about how to use the Torch API" />
      <APISection
        title="Standards"
        description="The Torch API is built to be as simple as possible. It uses the REST standard, and returns JSON data. Only endpoints using the GET method are supported. When working with the Torch API, you'll never have to use any other method."
      />
      <APISection
        title="Caching"
        description="The Torch API utilizes short cache times. This means that if you make a request to an endpoint, and then make the same request some time later before the cache has expired, you'll get the same data as a response. This is to reduce the load on our servers, and to make sure that we can provide the best experience possible. Additionally, the response you receive will contain timestamp data on when the cache was obtained, and when it expires."
      />
      <Info
        title="Endpoints"
        subtitle="A list of all the endpoints available in the Torch API"
      />
      <APIEndpoint title="Java Server Status" body="{}" />
    </Container>
  );
}
