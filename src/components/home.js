import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Servers } from "../app/servers";
import Search from "./search";
import Info from "./info";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const servers = Servers;

export default function Home() {
  const nav = useNavigate();

  const [javaServers, setJavaServers] = useState([]);
  const [bedrockServers, setBedrockServers] = useState([]);

  useEffect(() => {
    shuffleArray(servers.bedrock);
    shuffleArray(servers.java);

    setBedrockServers(servers.bedrock.slice(0, 4));
    setJavaServers(servers.java.slice(0, 4));
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
      <Info title="About" subtitle="A quick understanding of Torch and what we do" />
    </Container>
  );
}
