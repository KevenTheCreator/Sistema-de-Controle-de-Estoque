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
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import TextField from "@mui/material/TextField";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import SearchIcon from '@mui/icons-material/Search';


function StatusChips({ status }) {
  const getChipColor = (status) => {
    switch (status) {
      case 'Cancelado':
        return { label: 'Cancelado', color: 'error' }; // vermelho
      case 'Pendente':
        return { label: 'Pendente', color: 'warning' }; // laranja
      case 'Entregue':
        return { label: 'Entregue', color: 'success' }; // verde
      default:
        return { label: status, color: 'default' }; // cinza padrão
    }
  };

  const { label, color } = getChipColor(status);

  return (
    <Stack direction="row" spacing={1} justifyContent="center">
      <Chip label={label} color={color} />
    </Stack>
  );
}

function createData(
  id,
  produto,
  quantidadeRet,
  dataSaida,
  dataEntrega,
  codProduto,
  tipoSolicitante,
  nomeSolicitante,
  status
) {
  return {
    id,
    produto,
    quantidadeRet,
    dataSaida,
    dataEntrega,
    codProduto,
    tipoSolicitante,
    nomeSolicitante,
    status,
  };
}

const rows = [
  createData(
    1,
    "Teclado Mecânico",
    3,
    "2025-03-10",
    "2025-03-15",
    "TM123",
    "Funcionário",
    "João Silva",
    "Entregue"
  ),
  createData(
    2,
    "Mouse Gamer",
    2,
    "2025-04-01",
    "2025-04-05",
    "MG456",
    "Docente",
    "Maria Oliveira",
    "Pendente"
  ),
  createData(
    3,
    'Monitor 24"',
    1,
    "2025-04-10",
    "2025-04-20",
    "MN789",
    "Funcionário",
    "Carlos Souza",
    "Cancelado"
  ),
  createData(
    4,
    "Notebook Dell",
    5,
    "2025-04-12",
    "2025-04-18",
    "ND321",
    "Funcionário",
    "Ana Costa",
    "Entregue"
  ),
  createData(
    5,
    "Headset Gamer",
    4,
    "2025-03-22",
    "2025-03-29",
    "HG654",
    "Docente",
    "Pedro Lima",
    "Cancelado"
  ),
  createData(
    6,
    "Webcam Full HD",
    4,
    "2025-03-22",
    "2025-03-29",
    "WF987",
    "Docente",
    "Fernanda Alves",
    "Cancelado"
  ),
  createData(
    7,
    "Mousepad RGB",
    4,
    "2025-03-22",
    "2025-03-29",
    "MR654",
    "Discente",
    "Lucas Martins",
    "Cancelado"
  ),
  createData(
    8,
    "Caixa de Som Bluetooth",
    4,
    "2025-03-22",
    "2025-03-29",
    "CS123",
    "Discente",
    "Beatriz Rocha",
    "Cancelado"
  ),
  createData(
    9,
    "Adaptador USB-C",
    4,
    "2025-03-22",
    "2025-03-29",
    "AU456",
    "Discente",
    "Rafael Santos",
    "Cancelado"
  ),
  createData(
    10,
    "Dock Station",
    4,
    "2025-03-22",
    "2025-03-29",
    "DS789",
    "Funcionário",
    "Gabriela Mendes",
    "Cancelado"
  ),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  { id: "ord", numeric: false, disablePadding: true, label: "Ordem" },
  { id: "produto", numeric: false, disablePadding: false, label: "Produto" },
  {
    id: "quantidadeRet",
    numeric: true,
    disablePadding: false,
    label: "Quantidade Retirada",
  },
  {
    id: "dataSaida",
    numeric: false,
    disablePadding: false,
    label: "Data Saída",
  },
  {
    id: "dataEntrega",
    numeric: false,
    disablePadding: false,
    label: "Data Entrega",
  },
  {
    id: "codProduto",
    numeric: false,
    disablePadding: false,
    label: "Código do Produto",
  },
  {
    id: "tipoSolicitante",
    numeric: false,
    disablePadding: false,
    label: "Tipo de Solicitante",
  },
  {
    id: "nomeSolicitante",
    numeric: false,
    disablePadding: false,
    label: "Nome do Solicitante",
  },
  { id: "status", numeric: false, disablePadding: false, label: "Status" },
];

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
      <TableRow sx={{ backgroundColor: "#0066FF" }}>
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

function EnhancedTableToolbar({ numSelected, filter, setFilter }) {
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
      {numSelected > 0 ? (
        <Typography sx={{ width: "100%" }} color="inherit" variant="subtitle1">
          {numSelected} selecionado(s)
        </Typography>
      ) : (
        <>
          <Typography variant="h6" color="black" align="left">
            SOLICITANTES
          </Typography>
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

      {numSelected > 0 ? (
        <Tooltip title="Excluir">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filtrar lista">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default function Telasolicitantes() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("produto");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filter, setFilter] = React.useState("");

  const filteredRows = rows.filter(
    (row) =>
      row.tipoSolicitante.toLowerCase().includes(filter.toLowerCase()) ||
      row.nomeSolicitante.toLowerCase().includes(filter.toLowerCase())
  );

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredRows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper
        sx={{ width: "90%", mb: 2, borderRadius: 2, p: 2, mt: 10, mx: "auto" }}
      >
        <EnhancedTableToolbar
          numSelected={selected.length}
          filter={filter}
          setFilter={setFilter}
        />
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
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.produto}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 100 }}>
                        {row.quantidadeRet}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 120 }}>
                        {row.dataSaida}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 120 }}>
                        {row.dataEntrega}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.codProduto}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.tipoSolicitante}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.nomeSolicitante}
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
    </Box>
  );
}
