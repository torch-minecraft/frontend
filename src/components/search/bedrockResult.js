import { Box, Chip, Typography } from "@mui/material";
import MinecraftFormatted from "../util/format";
import { renderComponents } from "./searchResult";

export default function BedrockResult(props) {
  const { data } = props;

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
    MOTD: (
      <Box
        backgroundColor="search.background"
        padding={2}
        borderRadius={1}
        fontSize={13}
        fontFamily="Minecraft"
        lineHeight={2}
      >
        <MinecraftFormatted html={data.motd.html} />
      </Box>
    ),
    Edition: (
      <Typography component="p" fontFamily="Minecraft" fontSize={13}>
        {data.edition}
      </Typography>
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
      <Typography component="p" fontFamily="Minecraft" fontSize={13}>
        {data.players.online} / {data.players.max}
      </Typography>
    ),
    Gamemode: (
      <Typography component="p" fontFamily="Minecraft" fontSize={13}>
        {data.gamemode}
      </Typography>
    ),
    Server_ID: (
      <Typography component="p" fontFamily="Minecraft" fontSize={13}>
        {data.server_id}
      </Typography>
    ),
    Server_GUID: (
      <Typography component="p" fontFamily="Minecraft" fontSize={13}>
        {data.server_guid}
      </Typography>
    ),
    Port_IPv4: (
      <Typography component="p" fontFamily="Minecraft" fontSize={13}>
        {data.port_ipv4 || "N/A"}
      </Typography>
    ),
    Port_IPv6: (
      <Typography component="p" fontFamily="Minecraft" fontSize={13}>
        {data.port_ipv6 || "N/A"}
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
