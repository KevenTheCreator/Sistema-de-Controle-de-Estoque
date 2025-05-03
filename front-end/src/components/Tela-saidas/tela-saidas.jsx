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
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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
  nomeSolicitante,
  tipoSolicitante,
  destino,
  DataDevolucao,
  status
) {
  return {
    id,
    produto,
    quantidadeRet,
    dataSaida,
    nomeSolicitante,
    tipoSolicitante,
    destino,
    DataDevolucao,
    status
  };
}
const rows = [
  createData(
    1,
    "Teclado Mecânico",
    3,
    "2025-03-15",
    "Cleber",
    "Funcionário",
    "Casa",
    "2025-04-15",
    "Entregue"
  ),
  createData(
    2,
    "Mouse Gamer",
    2,
    "2025-03-20",
    "Ana",
    "Docente",
    "Escritório",
    "2025-04-20",
    "Pendente"
  ),
  createData(
    3,
    "Monitor 24\"",
    1,
    "2025-03-25",
    "Carlos",
    "Funcionário",
    "Sala de Reunião",
    "2025-04-25",
    "Cancelado"
  ),
  createData(
    4,
    "Notebook Dell",
    5,
    "2025-03-30",
    "Mariana",
    "Funcionário",
    "Laboratório",
    "2025-04-30",
    "Entregue"
  ),
  createData(
    5,
    "Headset Gamer",
    4,
    "2025-04-01",
    "João",
    "Docente",
    "Auditório",
    "2025-05-01",
    "Cancelado"
  ),
  createData(
    6,
    "Webcam Full HD",
    2,
    "2025-04-05",
    "Fernanda",
    "Docente",
    "Sala de Aula",
    "2025-05-05",
    "Pendente"
  ),
  createData(
    7,
    "Mousepad RGB",
    6,
    "2025-04-10",
    "Lucas",
    "Discente",
    "Biblioteca",
    "2025-05-10",
    "Entregue"
  ),
  createData(
    8,
    "Caixa de Som Bluetooth",
    3,
    "2025-04-15",
    "Beatriz",
    "Discente",
    "Sala de Estudos",
    "2025-05-15",
    "Cancelado"
  ),
  createData(
    9,
    "Adaptador USB-C",
    10,
    "2025-04-20",
    "Gabriel",
    "Discente",
    "Laboratório de Informática",
    "2025-05-20",
    "Entregue"
  ),
  createData(
    10,
    "Dock Station",
    2,
    "2025-04-25",
    "Larissa",
    "Funcionário",
    "Escritório",
    "2025-05-25",
    "Pendente"
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
    id: "nomeSolicitante",
    numeric: false,
    disablePadding: false,
    label: "Nome do Solicitante",
  },  
  {
    id: "tipoSolicitante",
    numeric: false,
    disablePadding: false,
    label: "Tipo de Solicitante",
  },
  {
    id: "destino",
    numeric: false,
    disablePadding: false,
    label: "Destino",
  },
  {
    id: "DataDevolucao",
    numeric: false,
    disablePadding: false,
    label: "Data de Devolução",
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

function EnhancedTableToolbar({ numSelected, filter, setFilter, handleOpenDialog, handleCloseDialog, openDialog }) {
  const [filterDialogOpen, setFilterDialogOpen] = React.useState(false);
  const [filterCategory, setFilterCategory] = React.useState("");
  const handleFilterDialogOpen = () => setFilterDialogOpen(true);
  const handleFilterDialogClose = () => setFilterDialogOpen(false);
  const applyFilters = () => {
    // Lógica para aplicar os filtros
    console.log("Filtro aplicado:", { filter, filterCategory });
    setFilterDialogOpen(false); // Fecha o Dialog após aplicar os filtros
  };

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
          "& .MuiToolbar-root": {
            position: "relative",
          },
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
        <Typography sx={{ width: "100%", fontFamily: "Montserrat" }} color="inherit" variant="subtitle1">
          {numSelected} selecionado(s)
        </Typography>
      ) : (
        <>
          <Typography variant="h6" color="black" align="left" sx={{ fontFamily: "Montserrat", fontWeight: 700 }}>
            SAÍDAS
          </Typography>

          <TextField
            variant="outlined"
            size="small"
            placeholder="Pesquisar por saída"
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
          <Button variant="contained" startIcon={<AddCircleIcon />} sx={{ height: 39, fontWeight: 700, fontFamily: "Montserrat", boxShadow: 0 }} onClick={handleOpenDialog} // Abre o Dialog ao clicar
          >Cadastrar Saída</Button>
          <React.Fragment>
            <Dialog open={openDialog} onClose={handleCloseDialog}
              slotProps={{
                paper: {
                  component: 'form',
                  onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries(formData.entries());
                    const email = formJson.email;
                    console.log(email);
                  },
                },
              }}
            >
              <DialogTitle>Cadastrar Saída</DialogTitle>
              <DialogContent sx={{ display: 'flex', flexDirection: "column", width: 600, gap: 3 }}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="product-name"
                  label="Nome do Produto"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  required
                  margin="dense"
                  id="quantity"
                  label="QuantidadeRec"
                  type="number"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  required
                  margin="dense"
                  id="supplier"
                  label="Fornecedor"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  required
                  margin="dense"
                  id="product-code"
                  label="Numero do Pedido"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  required
                  margin="dense"
                  id="valor-total"
                  label="Valor Total"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  required
                  margin="dense"
                  id="responsavel"
                  label="Responsável"
                  type="text"
                  fullWidth
                  variant="outlined"
                />

                {/* Unidade de Medida como Select */}
                <FormControl fullWidth margin="dense">
                  <InputLabel id="unit-label">Unidade de Medida</InputLabel>
                  <Select
                    labelId="unit-label"
                    id="unit"
                    label="Unidade de Medida"
                    defaultValue=""
                  >
                    <MenuItem value="un">Unidade</MenuItem>
                    <MenuItem value="kg">Kg</MenuItem>
                    <MenuItem value="g">Gramas</MenuItem>
                    <MenuItem value="l">Litros</MenuItem>
                  </Select>
                </FormControl>

                {/* Categoria como Select */}
                <FormControl fullWidth margin="dense">
                  <InputLabel id="category-label">Categoria</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    label="Categoria"
                    defaultValue=""
                  >
                    <MenuItem value="perifericos">Periféricos</MenuItem>
                    <MenuItem value="monitores">Monitores</MenuItem>
                    <MenuItem value="computadores">Computadores</MenuItem>
                  </Select>
                </FormControl>
              </DialogContent>

              <DialogActions sx={{ mr: 2, mb: 2 }}>
                <Button variant="outlined" onClick={handleCloseDialog} sx={{ fontWeight: 700, fontFamily: "Montserrat", boxShadow: 0 }}>Cancelar</Button>
                <Button variant="contained" type="submit" sx={{ fontWeight: 700, fontFamily: "Montserrat", boxShadow: 0 }}>Cadastrar</Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        </>
      )}

      {numSelected > 0 ? (
        <>
          <Tooltip title="Editar">
            <IconButton>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <Tooltip title="Filtrar lista">
            <IconButton onClick={handleFilterDialogOpen}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>

          {/* Dialog para o filtro */}
          <Dialog open={filterDialogOpen} onClose={handleFilterDialogClose}>
            <DialogTitle>Filtrar Saídas</DialogTitle>
            <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 400 }}>

              <FormControl fullWidth margin="dense">
                <InputLabel id="order-by-label">Ordenar por</InputLabel>
                <Select
                  labelId="order-by-label"
                  id="order-by"
                  label="Ordenar por"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <MenuItem value="produto">Produto</MenuItem>
                  <MenuItem value="quantidade">Quantidade Rec.</MenuItem>
                  <MenuItem value="fornecedor">Fornecedor</MenuItem>
                  <MenuItem value="dataEntrada">Data de Entrada</MenuItem>
                  <MenuItem value="numeroPedido">Número do Pedido</MenuItem>
                  <MenuItem value="valorTotal">Valor Total</MenuItem>
                  <MenuItem value="responsavel">Responsável</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth margin="dense">
                <InputLabel id="sort-direction-label">Ordem de Classificação</InputLabel>
                <Select
                  labelId="sort-direction-label"
                  id="sort-direction"
                  label="Ordem de Classificação"
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <MenuItem value="ascendente">Ascendente</MenuItem>
                  <MenuItem value="descendente">Descendente</MenuItem>
                </Select>
              </FormControl>

            </DialogContent>
            <DialogActions>
              <Button onClick={handleFilterDialogClose}>Cancelar</Button>
              <Button onClick={applyFilters}>Aplicar</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Toolbar>
  );
}

export default function TelaSaidas() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("produto");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filter, setFilter] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const filteredRows = rows.filter(
    (row) =>
      row.tipoSolicitante.toLowerCase().includes(filter.toLowerCase()) ||
      row.nomeSolicitante.toLowerCase().includes(filter.toLowerCase()) ||
      row.dataSaida.toLowerCase().includes(filter.toLowerCase()) ||
      row.produto.toLowerCase().includes(filter.toLowerCase()) ||
      row.destino.toLowerCase().includes(filter.toLowerCase()) ||
      row.status.toLowerCase().includes(filter.toLowerCase())
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
        sx={{ width: "90%", mb: 2, borderRadius: 2, p: 2, mt: 10, mx: "auto", marginTop: 7 }}
      >
        <EnhancedTableToolbar
          numSelected={selected.length}
          filter={filter}
          setFilter={setFilter}
          openDialog={openDialog} // Passa o estado do Dialog
          handleOpenDialog={handleOpenDialog} // Passa a função para abrir o Dialog
          handleCloseDialog={handleCloseDialog} // Passa a função para fechar o Dialog
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
                        {row.nomeSolicitante}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.tipoSolicitante}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.destino}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.DataDevolucao}
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
