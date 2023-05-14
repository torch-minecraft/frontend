import { Chip, Typography } from "@mui/material";
import React from "react";
import { renderComponents } from "./searchResult";

export default function Offline(props) {
  const components = {
    Status: (
      <Chip
        label="offline"
        color="error"
        variant="outlined"
        size="small"
        sx={{
          fontWeight: "bold",
        }}
      />
    ),
    Host: (
      <Typography component="p" fontFamily="Minecraft" fontSize={13}>
        {props.host}
      </Typography>
    ),
    Port: (
      <Typography component="p" fontFamily="Minecraft" fontSize={13}>
        {props.port}
      </Typography>
    ),
  };

  return renderComponents(components);
}
