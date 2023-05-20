import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
  Link,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { servers } from "../app/servers";
import Search from "./search";
import Info from "./info";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const serverList = servers;

export default function Home() {
  const nav = useNavigate();

  const [javaServers, setJavaServers] = useState([]);
  const [bedrockServers, setBedrockServers] = useState([]);

  useEffect(() => {
    shuffleArray(serverList.bedrock);
    shuffleArray(serverList.java);

    setBedrockServers(serverList.bedrock.slice(0, 4));
    setJavaServers(serverList.java.slice(0, 4));
  }, []);

  function serversDisplay(arr, type) {
    return (
      <Grid2 xs={12} md={6}>
        <Stack direction="column" spacing={2}>
          {arr.map((server, index) => (
            <Button
              key={index}
              variant="outlined"
              color="custom"
              fullWidth
              onClick={() => {
                nav(`/search/${type}/${server.ip}`);
              }}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <Grid2
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Chip
                  color={type === "java" ? "primary" : "secondary"}
                  label={type}
                  variant="outlined"
                  size="small"
                  sx={{
                    fontFamily: "monospace",
                  }}
                />
                <Typography
                  variant="h6"
                  fontSize={"17px"}
                  color="custom.text"
                  fontFamily="roboto, sans-serif"
                  fontWeight="bold"
                  sx={{
                    marginLeft: "10px",
                  }}
                >
                  {server.name}
                </Typography>
              </Grid2>
              <Grid2
                xs={12}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
                component="p"
                fontFamily="Minecraft"
                fontSize={12}
              >
                {server.ip}
              </Grid2>
            </Button>
          ))}
        </Stack>
      </Grid2>
    );
  }

  return (
    <Container maxWidth="xl">
      <Search type="Java" ip="" />
      <Box component="h2" color="inherit">
        Try it out with some samples!
      </Box>
      <Grid2 container spacing={2}>
        {serversDisplay(javaServers, "java")}
        {serversDisplay(bedrockServers, "bedrock")}
      </Grid2>
      <Divider
        sx={{
          marginTop: 6,
          marginBottom: 2,
        }}
      />
      <Info
        title="About"
        subtitle="A quick understanding of Torch and what we do"
      />
      <Typography>
        Welcome to Torch, the premier online tool for Minecraft server
        information lookup. Our platform allows you to quickly and easily access
        information about any Java or Bedrock server. With our API, developers
        can integrate Torch's powerful server lookup capabilities into their own
        projects with ease. Our API boasts a short cache duration of just 2
        minutes, ensuring that your data is always up-to-date.
        <br />
        <br />
        At Torch, we pride ourselves on our cutting-edge technology. Our website
        is built using React and Material-UI, while our API is built with Go. We
        communicate with Minecraft servers using the official networking
        protocol, ensuring that our data is always accurate and reliable. If
        you're interested in contributing to the project, we encourage you to
        check out our code on{" "}
        <Link
          href="https://github.com/orgs/torch-minecraft/repositories"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </Link>{" "}
        and join our community of developers.
        <br />
        <br />
        If you're looking to use Torch's API in your project, head over to our{" "}
        <Link href="/api">API</Link> page to learn more. Our API is designed to
        be developer-friendly, with clear documentation and easy-to-use
        endpoints. Whether you're building a bot to check server statuses or trying to obtain server icons, Torch's API has everything you need to get started.
        <br />
        <br />
        We hope you enjoy using Torch as much as we've enjoyed building it. If
        you have any questions or feedback, please don't hesitate to contact us.
        Thank you for choosing Torch!
      </Typography>
    </Container>
  );
}
