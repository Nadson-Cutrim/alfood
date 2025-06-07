import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioRestaurante = () => {
  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      axios
        .get<IRestaurante>(
          `http://localhost:8000/api/v2/restaurantes/${parametros.id}/`
        )
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
      axios
        .put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
          nome: nomeRestaurante,
        })

        .then(() => {
          alert("Restaurante atualizado com sucesso!");
        });
    } else {
      axios
        .post("http://localhost:8000/api/v2/restaurantes/", {
          nome: nomeRestaurante,
        })

        .then(() => {
          alert("Restaurante cadastrado com sucesso!");
        });
    }
  };

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Box component="form" onSubmit={aoSubmeterForm}>
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
        <Button type="submit" variant="outlined" fullWidth sx={{ marginTop: 2 }}>
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioRestaurante;
