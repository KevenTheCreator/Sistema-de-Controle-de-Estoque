import React from "react";
import "./tela-produtos.css";
import Inventory2Icon from '@mui/icons-material/Inventory2';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#0066FF',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const rows = [
  createData(1, 159, 6.0, 24, 4.0),
  createData(2, 237, 9.0, 37, 4.3),
  createData(3, 262, 16.0, 24, 6.0),
  createData(4, 305, 3.7, 67, 4.3),
  createData(5, 356, 16.0, 49, 3.9),
  createData(6, 356, 16.0, 49, 3.9),
  createData(7, 356, 16.0, 49, 3.9),
  createData(8, 356, 16.0, 49, 3.9),
  createData(9, 356, 16.0, 49, 3.9),
  createData(10, 356, 16.0, 49, 3.9)
];

const Telaprodutos = () => {
  return (
    <div className="tela-produtos">
      <div className="aba-produtos">
        <div className="aba-produtos-titulo">
          <Inventory2Icon sx={{ fontSize: 30, color: 'black', position: "absolute", left: 13, top: 21 }} />
          <h1>Produtos</h1>
        </div>
        <div className="aba-produtos-pesquisa">
          <TextField
            id="outlined-basic"
            placeholder="Buscar produtos"
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
                borderRadius: '16px',
                height: '80px', // altura total do input
                paddingRight: '14px',
                '& fieldset': {
                  borderRadius: '16px',
                },
                '& input::placeholder': {
                  color: 'gray',
                  fontSize: '18px',
                  opacity: 1, // Isso é importante para não ficar cinza!
                },
                width: 400, // largura total do input 
              }
            }}
          />
          <SearchIcon sx={{ position: "absolute", left: 350, top: 30, color: 'black' }} />
        </div>
      </div>

      <div className="tabela-produtos">
        <TableContainer component={Paper} sx={{
          width: '90%',
          margin: '40px auto', // centraliza e dá espaçamento vertical
          boxShadow: 3, // só pra dar um visual leve
          borderRadius: '16px',
        }}>
          <Table sx={{
            minWidth: 650,
            '& .MuiTableCell-root': {
              padding: '20px',
            }
          }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Ord.</StyledTableCell>
                <StyledTableCell align="center">Produtos</StyledTableCell>
                <StyledTableCell align="center">Quantidade</StyledTableCell>
                <StyledTableCell align="center">Fornecedor</StyledTableCell>
                <StyledTableCell align="center">Códido do produto</StyledTableCell>
                <StyledTableCell align="center">Unidade de medida</StyledTableCell>
                <StyledTableCell align="center">Categoria</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center" sx={{ padding: 0 }}>{row.calories}</TableCell>
                  <TableCell align="center">{row.fat}</TableCell>
                  <TableCell align="center">{row.carbs}</TableCell>
                  <TableCell align="center">{row.protein}</TableCell>
                  <TableCell align="center">{row.protein}</TableCell>
                  <TableCell align="center">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Telaprodutos;
