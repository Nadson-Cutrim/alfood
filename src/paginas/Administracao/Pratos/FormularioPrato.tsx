import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../../http";
import ITag from "../../../interfaces/ITag"
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioPrato = () => {
  const [nomePrato, setNomePrato] = useState("");
  const [descricaoPrato, setDescricaoPrato] = useState("");
  const [restaurante, setRestaurante] = useState("");
  const [tags, setTags] = useState<ITag[]>([]);
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [tag, setTag] = useState("");

  useEffect(() => {
    http.get<{tags: ITag[]}>('tags/')
    .then(resposta => setTags(resposta.data.tags))
    http.get<IRestaurante[]>('restaurantes/')
    .then(resposta => setRestaurantes(resposta.data))
       
    }, []);

  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
  };
  return (
    <>
      <Box>
        <Container maxWidth="lg" sx={{ marginTop: 2 }}>
          <Paper sx={{ p: 2 }}>
            {/*Conteúdo da página*/}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              <Typography component="h1" variant="h6">
                Formulário de Pratos
              </Typography>
              <Box
                component="form"
                onSubmit={aoSubmeterForm}
                sx={{ width: "100%" }}
              >
                <TextField
                  value={nomePrato}
                  onChange={(evento) => setNomePrato(evento.target.value)}
                  id="standard-basic"
                  label="Nome do Prato"
                  variant="standard"
                  fullWidth
                  margin="dense"
                  required
                  
                />
                <TextField
                  value={descricaoPrato}
                  onChange={(evento) => setDescricaoPrato(evento.target.value)}
                  id="standard-basic"
                  label="Descrição do Prato"
                  variant="standard"
                  margin="dense"
                  fullWidth
                  required
                />

                <FormControl margin="dense" fullWidth>
                    <InputLabel id="select-tag" >Tag</InputLabel>
                    <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}>
                        {tags.map((tag) => (
                            <MenuItem key={tag.id} value={tag.value}>
                                {tag.value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl margin="dense" fullWidth>
                    <InputLabel id="select-restaurante" >Restaurante</InputLabel>
                    <Select labelId="select-restaurante" value={restaurante} onChange={evento => setRestaurante(evento.target.value)}>
                        {restaurantes.map((restaurante) => (
                            <MenuItem key={restaurante.id} value={restaurante.id}>
                                {restaurante.nome}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
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

export default FormularioPrato;
