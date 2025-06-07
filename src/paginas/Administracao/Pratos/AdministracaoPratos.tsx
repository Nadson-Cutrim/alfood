import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import http from "../../../http";
import IPrato from "../../../interfaces/IPrato";

const AdministracaoPratos = () => {
  const [pratos, setPratos] = useState<IPrato[]>([]);
  useEffect(() => {
    http
      .get<IPrato[]>(`/pratos/`)
      .then((resposta) => {
        setPratos(resposta.data);
      })
      .catch((erro) => {
        console.log(erro);
      });
  },[]);

  const excluir = (pratoAhSerExcluido: IPrato) => {
    http
      .delete(`/pratos/${pratoAhSerExcluido.id}/`)
      .then(() => {
        const listaPratos = pratos.filter(
          (prato) => prato.id !== pratoAhSerExcluido.id
        );
        setPratos([...listaPratos]);
        alert("Prato excluído com sucesso!");
      })
      .catch((erro) => {
        console.log(erro);
      });
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pratos.map((prato) => (
            <TableRow key={prato.id}>
              <TableCell>{prato.nome}</TableCell>
              <TableCell>{prato.tag}</TableCell>
              <TableCell>[<a href={prato.imagem} target="blank" rel="noreferrer"> ver imagem</a>]</TableCell>
              <TableCell>
                [
                <RouterLink to={`/admin/pratos/${prato.id}`}>
                  📝 Editar
                </RouterLink>
                ]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluir(prato)}
                >
                  🗑️ Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default AdministracaoPratos;
