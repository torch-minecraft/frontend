import { Button, Divider, MenuItem, Select, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "./title";

export default function Search(props) {
  const nav = useNavigate();

  const [originalIp, setOriginalIp] = useState(props.ip);
  const [originalType, setOriginalType] = useState(props.type);

  const [type, setType] = useState(props.type);
  const [ip, setIP] = useState(props.ip);

  const enterDelayRef = useRef(false);

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Enter") {
        if (enterDelayRef.current) return;
        enterDelayRef.current = true;
        setTimeout(() => {
          enterDelayRef.current = false;
        }, 3000);
        handleSubmit(type, ip);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [type, ip]);

  async function handleSubmit(type, ip) {
    if (ip === "") return;
    setOriginalIp(ip);
    setOriginalType(type);

    nav(`/search/${type.toLowerCase()}/${ip}`);
  }

  return (
    <>
      <Title />
      <Grid2 container spacing={2}>
        <Grid2 xs={12} md={2}>
          <Select
            variant="outlined"
            fullWidth
            displayEmpty
            onChange={(event) => {
              setType(event.target.value);
            }}
            defaultValue={
              props.type.charAt(0).toUpperCase() + props.type.slice(1)
            }
          >
            <MenuItem value="Java">Java</MenuItem>
            <MenuItem value="Bedrock">Bedrock</MenuItem>
          </Select>
        </Grid2>
        <Grid2 xs={12} md={8}>
          <TextField
            label="Server IP"
            variant="outlined"
            fullWidth
            onChange={(event) => {
              setIP(event.target.value);
            }}
            defaultValue={props.ip}
          />
        </Grid2>
        <Grid2 xs={12} md={2}>
          <Button
            type="submit"
            variant="outlined"
            fullWidth
            size="large"
            onClick={() => handleSubmit(type, ip)}
            sx={{
              height: "56px",
            }}
            disabled={ip === "" || (ip === originalIp && type === originalType)}
          >
            Search
          </Button>
        </Grid2>
      </Grid2>
      <Divider
        sx={{
          marginTop: "40px",
          marginBottom: "40px",
        }}
      />
    </>
  );
}
