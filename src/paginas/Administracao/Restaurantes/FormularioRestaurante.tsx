import {
  AppBar,
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Toolbar,
  Paper,Link
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../http";


const FormularioRestaurante = () => {
  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      http
        .get<IRestaurante>(`/restaurantes/${parametros.id}/`)
        .then((resposta) => {
          setNomeRestaurante(resposta.data.nome);
        })
        .catch((erro) => {
          console.log(erro);
        });
    }
  }, [parametros]);

  const [nomeRestaurante, setNomeRestaurante] = useState("");

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    if (parametros.id) {
      http
        .put(`/restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante,
        })

        .then(() => {
          alert("Restaurante atualizado com sucesso!");
        });
    } else {
      http
        .post("/restaurantes/", {
          nome: nomeRestaurante,
        })

        .then(() => {
          alert("Restaurante cadastrado com sucesso!");
        });
    }
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6">Administração</Typography>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <Link component={RouterLink} to="/admin/restaurantes">
                <Button sx={{ my: 2, color: "white" }}>Restaurantes</Button>
              </Link>
              <Link component={RouterLink} to="/admin/restaurantes/novo">
                <Button sx={{ my: 2, color: "white" }}>Novo Restaurante</Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box>
        <Container maxWidth="lg" sx={{ marginTop: 2 }}>
          <Paper sx={{ p: 2 }}>
            {/*Conteúdo da página*/}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexGrow: 1
              }}
            >
              <Box component="form" onSubmit={aoSubmeterForm} sx={{width: '100%'}}>
                <Typography component="h1" variant="h6">
                  Formulário de Restaurantes
                </Typography>
                <TextField
                  value={nomeRestaurante}
                  onChange={(evento) => setNomeRestaurante(evento.target.value)}
                  id="standard-basic"
                  label="Nome do Restaurante"
                  variant="standard"
                  fullWidth
                  required
                />
                <Button
                  type="submit"
                  variant="outlined"
                  fullWidth
                  sx={{ marginTop: 2 }}
                >
                  Salvar
                </Button>
              </Box>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default FormularioRestaurante;
