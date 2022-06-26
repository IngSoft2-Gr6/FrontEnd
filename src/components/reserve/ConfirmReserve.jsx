import { Paper, Typography, Button } from "@mui/material";

const Confirmreserve = () =>{
  return (
    <Paper elevation={24} style={{ padding: "1rem", borderRadius: "1rem" }}>
      <Typography>Desea realizar su reserva en este parqueadero?</Typography>
      <Button>Aceptar</Button>
      <Button color="danger">Cancelar</Button>
    </Paper>
  );
};

export default Confirmreserve;