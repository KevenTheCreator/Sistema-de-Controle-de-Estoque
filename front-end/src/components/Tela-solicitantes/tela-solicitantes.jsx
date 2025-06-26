import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import axios from "../../api/axiosConfig";

// Exibe chip de status "Entregue"
function StatusChips() {
  return (
    <Stack direction="row" spacing={1} justifyContent="center">
      <Chip label="Entregue" color="success" />
    </Stack>
  );
}

// Função para ordenação decrescente
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

// Retorna função de comparação para ordenação
function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Cabeçalhos da tabela de solicitantes
const headCells = [
  { id: "ord", numeric: false, disablePadding: true, label: "Ordem" },
  { id: "nomeSolicitante", numeric: false, disablePadding: false, label: "Nome do Solicitante" },
  { id: "tipoSolicitante", numeric: false, disablePadding: false, label: "Tipo de Solicitante" },
  { id: "produto", numeric: false, disablePadding: false, label: "Produto" },
  { id: "quantidadeRetirada", numeric: true, disablePadding: false, label: "Quantidade Retirada" },
  { id: "dataSaida", numeric: false, disablePadding: false, label: "Data Saída" },
  { id: "dataDevolucao", numeric: false, disablePadding: false, label: "Data de Devolução" },
  { id: "destino", numeric: false, disablePadding: false, label: "Destino" },
  { id: "status", numeric: false, disablePadding: false, label: "Status" },
];

// Cabeçalho da tabela com ordenação
function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) =>
    onRequestSort(event, property);

  return (
    <TableHead sx={{ position: "relative" }}>
      <TableRow sx={{ backgroundColor: "#222D3C" }}>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: "bold", color: "white" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{ color: "white", paddingLeft: 3 }}
            >
              {headCell.label}
              {orderBy === headCell.id && (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc"
                    ? "ordenado decrescente"
                    : "ordenado crescente"}
                </Box>
              )}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// Barra de ferramentas acima da tabela (pesquisa, excluir)
function EnhancedTableToolbar({ numSelected, filter, setFilter, handleDeleteDispatch }) {
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          display: "flex",
          position: "relative",
          alignItems: "center",
          gap: 2,
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {/* Exibe quantidade selecionada ou título */}
      {numSelected > 0 ? (
        <Typography sx={{ width: "100%" }} color="inherit" variant="subtitle1">
          {numSelected} selecionado(s)
        </Typography>
      ) : (
        <>
          <Typography
            variant="h6"
            color="black"
            align="left"
            sx={{ fontFamily: "Montserrat", fontWeight: 700 }}
          >
            SOLICITANTES
          </Typography>
          {/* Campo de pesquisa */}
          <TextField
            variant="outlined"
            size="small"
            placeholder="Pesquisar por solicitante"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{ width: 300, ml: "auto" }}
            InputProps={{
              startAdornment: (
                <SearchIcon sx={{ color: "black", mr: 1, fontSize: 20 }} />
              ),
              sx: {
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  borderRadius: "16px",
                  "& fieldset": {
                    borderRadius: "16px",
                  },
                },
              },
            }}
          />
        </>
      )}

      {/* Botão de excluir quando há seleção */}
      {numSelected > 0 ? (
        <Tooltip title="Excluir">
          <IconButton onClick={handleDeleteDispatch} disabled={numSelected === 0}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        ""
      )}
    </Toolbar>
  );
}

// Componente principal da tela de solicitantes
export default function Telasolicitantes() {
  // Estados principais
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filter, setFilter] = React.useState("");
  const [rows, setRows] = React.useState([]);
  const [snackbar, setSnackbar] = React.useState({ open: false, message: "", severity: "success" });

  // Filtro de pesquisa
  const filteredRows = rows.filter(
    (row) =>
      row.tipoSolicitante.toLowerCase().includes(filter.toLowerCase()) ||
      row.nomeSolicitante.toLowerCase().includes(filter.toLowerCase())
  );

  // Carrega dados dos solicitantes (saídas) ao montar o componente
  React.useEffect(() => {
    axios.get("/saidas")
      .then(response => setRows(response.data))
      .catch(() => setRows([]));
  }, []);

    // Exclui dados dos solicitantes selecionados (saídas)
  const handleDeleteDispatch = () => {
    if (selected.length === 0) return;
    Promise.all(selected.map(id => axios.delete(`/saidas/${id}`)))
      .then(() => {
        setRows(prev => prev.filter(row => !selected.includes(row.id)));
        setSnackbar({ open: true, message: "Solicitantes excluídos com sucesso!", severity: "success" });
        setSelected([]);
      })
      .catch(() => {
        setSnackbar({ open: true, message: "Erro ao excluir solititantes!", severity: "error" });
      });
  };

  // Ordenação da tabela
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  // Seleciona todos os itens da página
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredRows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  // Seleciona/desseleciona um item
  const handleClick = (event, id) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  // Paginação
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Verifica se item está selecionado
  const isSelected = (id) => selected.indexOf(id) !== -1;
  // Linhas vazias para preencher a tabela
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{
          width: "90%",
          mb: 2,
          borderRadius: 2,
          p: 2,
          mt: 10,
          mx: "auto",
          marginTop: 7,
        }}
      >
        {/* Barra de ferramentas */}
        <EnhancedTableToolbar
          numSelected={selected.length}
          filter={filter}
          setFilter={setFilter}
          handleDeleteDispatch={handleDeleteDispatch}
          selected={selected}
        />
        {/* Tabela de solicitantes */}
        <TableContainer sx={{ minHeight: 600, overflowX: "auto" }}>
          <Table
            sx={{ minWidth: 1000 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredRows.length}
            />
            <TableBody>
              {filteredRows
                .slice()
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        align="center"
                        sx={{ minWidth: 50 }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 120 }}>
                        {row.nomeSolicitante}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.tipoSolicitante}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.produto}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 100 }}>
                        {row.quantidadeRetirada}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 120 }}>
                        {row.dataSaida}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.dataDevolucao ? row.dataDevolucao : "Sem retorno"}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.destino}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 100 }}>
                        <StatusChips status={row.status} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={10} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* Paginação */}
        <TablePagination
          rowsPerPageOptions={[10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* Snackbar de feedback */}
      <Snackbar
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={() => setSnackbar({ ...snackbar, open: false })}
    >
      <Alert
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        severity={snackbar.severity}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
    </Box>
  );
}
