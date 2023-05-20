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
import fetchData from "../../app/status";
import Search from "../search";
import Copy from "../util/copy";
import JavaResult from "./javaResult";
import Offline from "./offline";
import BedrockResult from "./bedrockResult";
import status from "../../app/status";

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

  const [apiDropdown, setApiDropdown] = useState(false);

  const { serverType, ip } = useParams();

  const location = useLocation();

  const apiUrl =
    process.env.REACT_APP_API_URL + "status/" + serverType + "/" + ip;

  async function fetchData() {
    return await status(ip, serverType);
  }

  useEffect(() => {
    setFinishedLoading(false);
    (async () => {
      const status = await fetchData();
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
                <Offline data={data} />
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
            >
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
              <Box display={apiDropdown ? "block" : "none"}>
                <Divider
                  sx={{
                    marginBottom: 2,
                  }}
                />
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
                    }}
                  />
                  <Typography component="p" marginLeft={1} color="custom.main">
                    {apiUrl}
                  </Typography>
                </Box>
                <Divider
                  sx={{
                    marginTop: 2,
                  }}
                />
                <Box
                  component="div"
                  position="relative"
                  padding={2}
                  paddingTop={1}
                >
                  <Copy
                    text={JSON.stringify(data, null, 4)}
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
