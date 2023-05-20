import { Box, Chip, Typography } from "@mui/material";
import MinecraftFormatted from "../util/format";
import { renderComponents } from "./searchResult";

export default function JavaResult(props) {
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
        <Typography component="p" fontFamily="Minecraft" fontSize={13}>
          {data.players.online} / {data.players.max}
        </Typography>
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
