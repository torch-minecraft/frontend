import { Box, Button, Chip, Typography } from "@mui/material";
import MinecraftFormatted from "../util/format";
import { renderComponents } from "./searchResult";
import { useEffect, useState } from "react";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

export default function JavaResult(props) {
  const { data } = props;

  const [openPlayerList, setOpenPlayerList] = useState(false);

  useEffect(() => {
    setOpenPlayerList(false);
    console.log(data.players.sample);
  }, []);

  const components = {
    Status: (
      <Chip
        label="online"
        color="success"
        variant="outlined"
        size="small"
        sx={{
          fontWeight: "bold",
        }}
      />
    ),
    Host: (
      <Typography component="p" fontFamily="Minecraft" fontSize={13}>
        {data.host}
      </Typography>
    ),
    Port: (
      <Typography component="p" fontFamily="Minecraft" fontSize={13}>
        {data.port}
      </Typography>
    ),
    Icon: <Box component={"img"} src={data.icon} />,
    MOTD: (
      <Box
        backgroundColor="search.background"
        padding={2}
        borderRadius={1}
        fontSize={13}
        fontFamily="Minecraft"
        lineHeight={2}
      >
        <MinecraftFormatted html={data.description.html} />
      </Box>
    ),
    Version: (
      <Typography component="p" fontFamily="Minecraft" fontSize={13}>
        {data.version.name.raw}
      </Typography>
    ),
    Protocol: (
      <Typography component="p" fontFamily="Minecraft" fontSize={13}>
        {data.version.protocol}
      </Typography>
    ),
    Players: (
      <Box>
        <Box display="flex" alignItems="center">
          <Typography component="p" fontFamily="Minecraft" fontSize={13}>
            {data.players.online} / {data.players.max}
          </Typography>
          {data.players.sample.length > 0 && (
            <Button
              variant="outlined"
              color="w"
              endIcon={openPlayerList ? <ArrowDropDown /> : <ArrowDropUp />}
              onClick={() => setOpenPlayerList(!openPlayerList)}
              sx={{
                textTransform: "none",
                marginLeft: 2,
              }}
            >
              {openPlayerList ? "Hide player list" : "Show player list"}
            </Button>
          )}
        </Box>
          {openPlayerList && (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              marginTop={2}
              backgroundColor="search.background"
              borderRadius={1}
              paddingLeft={4}
            >
              {data.players.sample.map((player) => (
                console.log(player),
                <Typography
                  component="p"
                  fontFamily="Minecraft"
                  fontSize={13}
                  key={player.id}
                  lineHeight={2}
                  letterSpacing={0.5}
                >
                  <MinecraftFormatted html={player.name.html} />
                </Typography>
              ))}
            </Box>
          )}
      </Box>
    ),
    SRV_Record: (
      <Typography component="p" fontFamily="Minecraft" fontSize={13}>
        {data.used_srv
          ? `${data.used_srv.host}, ${data.used_srv.port}`
          : "None"}
      </Typography>
    ),
    Latency: (
      <Typography component="p" fontFamily="Minecraft" fontSize={13}>
        {`${data.latency}ms`}
      </Typography>
    ),
  };

  return <>{renderComponents(components)}</>;
}
