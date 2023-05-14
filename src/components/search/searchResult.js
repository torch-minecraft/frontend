import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import { stackoverflowDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import fetchData from "../../app/fetchData";
import Search from "../search";
import Copy from "../util/copy";
import JavaResult from "./javaResult";
import Offline from "./offline";
import BedrockResult from "./bedrockResult";

export function renderComponents(components) {
  return (
    <Grid2 container spacing={1} padding={2}>
      {Object.entries(components).map(([key, value], index) => (
        <React.Fragment key={index}>
          <Grid2 md={2} xs={12}>
            <Typography
              component="p"
              fontFamily="Poppins, sans-serif"
              fontWeight="bold"
            >
              {key.replace("_", " ")}
            </Typography>
          </Grid2>
          <Grid2 md={10} xs={12}>
            {value}
          </Grid2>
          {index !== Object.entries(components).length - 1 ? (
            <Grid2
              xs={12}
              sx={{
                marginTop: 1,
                marginBottom: 1,
              }}
            >
              <Divider />
            </Grid2>
          ) : null}
        </React.Fragment>
      ))}
    </Grid2>
  );
}

export default function SearchResult() {
  const [online, setOnline] = useState(false);
  const [finishedLoading, setFinishedLoading] = useState(false);

  const [data, setData] = useState({});

  const [usedHost, setUsedHost] = useState("");
  const [usedPort, setUsedPort] = useState(0);

  const [apiDropdown, setApiDropdown] = useState(false);

  const { serverType, ip } = useParams();

  const location = useLocation();

  const apiUrl =
    process.env.REACT_APP_API_URL +
    "api/v1/status/" +
    serverType +
    "?host=" +
    ip +
    "&port=" +
    usedPort;

  async function getData() {
    let port = 0;
    if (serverType === "bedrock") {
      port = 19132;
    } else {
      port = 25565;
    }

    let newIp = ip;

    if (ip.includes(":")) {
      let split = ip.split(":");
      newIp = split[0];
      port = split[1];
    }

    if (port < 0 || port > 65535) {
      setOnline(false);
      setFinishedLoading(true);
      return;
    }

    setUsedHost(newIp);
    setUsedPort(port);

    return await fetchData(newIp, port, serverType);
  }

  useEffect(() => {
    setFinishedLoading(false);
    (async () => {
      const status = await getData();
      if (
        status === null ||
        status === undefined ||
        status === {} ||
        status.offline
      ) {
        setOnline(false);
      } else {
        setOnline(true);
      }
      setData(status);
      setFinishedLoading(true);
    })();
  }, [location.pathname]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Container
      maxWidth="xl"
      sx={{
        marginBottom: 5,
      }}
    >
      <Search type={serverType} ip={ip} />
      {!finishedLoading ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress
            sx={{
              marginTop: 5,
              marginBottom: 5,
            }}
          />
        </Box>
      ) : (
        <>
          <Box border={1} borderRadius={1} borderColor="search.main">
            <Box padding={2}>
              {online ? (
                serverType === "bedrock" ? (
                  <BedrockResult data={data} />
                ) : (
                  <JavaResult data={data} />
                )
              ) : (
                <Offline host={usedHost} port={usedPort} />
              )}
            </Box>
          </Box>
          <>
            <Divider
              sx={{
                marginTop: 4,
              }}
            />
            <Box
              border={1}
              borderRadius={1}
              borderColor="search.main"
              marginTop={4}
              padding={2}
            >
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
                  setApiDropdown(!apiDropdown);
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
                    API Usage
                  </Typography>
                  {apiDropdown ? <ArrowDropUp /> : <ArrowDropDown />}
                </Box>
              </Button>
              <Box display={apiDropdown === true ? "block" : "none"}>
                <Divider
                  sx={{
                    marginTop: 2,
                    marginBottom: 2,
                  }}
                />
                <Box
                  backgroundColor="search.background"
                  padding={1.5}
                  borderRadius={1}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    <Chip
                      size="small"
                      label="GET"
                      color="success"
                      sx={{
                        fontWeight: "bold",
                      }}
                    />
                    <Typography
                      component="p"
                      fontFamily="Arial"
                      marginLeft={1}
                      color="custom.main"
                    >
                      {apiUrl}
                    </Typography>
                  </Box>
                  <Copy text={apiUrl} />
                </Box>
                <Box component="div" position="relative">
                  <Copy
                    text={JSON.stringify(data, null, 4)}
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
                    {JSON.stringify(data, null, 4)}
                  </SyntaxHighlighter>
                </Box>
              </Box>
            </Box>
          </>
        </>
      )}
    </Container>
  );
}
