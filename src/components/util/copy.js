import Check from "@mui/icons-material/Check";
import ContentCopy from "@mui/icons-material/FileCopy";
import { IconButton, Tooltip } from "@mui/material";
import React, { useRef, useState } from "react";

export default function Copy(props) {
  const [iconState, setIconState] = useState("copy");
  const [toolTipText, setToolTipText] = useState("Copy to clipboard");
  const timeoutRef = useRef(null);

  const copyToClipboard = () => {
    if (iconState === "check") {
      clearTimeout(timeoutRef.current);
    }

    navigator.clipboard.writeText(props.text).then(() => {
      setIconState("check");
      setToolTipText("Copied");
      timeoutRef.current = setTimeout(() => {
        setIconState("copy");
        setToolTipText("Copy to clipboard");
      }, 3000);
    });
  };

  return (
    <Tooltip title={toolTipText}>
      <IconButton onClick={copyToClipboard} sx={props.sx}>
        {iconState === "copy" ? (
          <ContentCopy
            color="custom"
            sx={{
              "&:hover": {
                color: "white",
              },
            }}
          />
        ) : (
          <Check color="success" />
        )}
      </IconButton>
    </Tooltip>
  );
}
