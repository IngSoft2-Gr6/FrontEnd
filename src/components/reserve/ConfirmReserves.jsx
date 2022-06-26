import * as React from "react";
import { Paper, Typography, Button } from "@mui/material";

const ConfirmReserve = () =>{

  return (
    <Paper elevation={24} style={{ padding: "1rem", borderRadius: "1rem" }}>
      <Typography>Desea realizar su reserva en este parqueadero?</Typography>
      <Button>Aceptar</Button>
      <Button>Cancelar</Button>
    </Paper>
  );
};

export default ConfirmReserve;