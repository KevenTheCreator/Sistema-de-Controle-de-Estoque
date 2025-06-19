import * as React from "react";
import { alpha } from "@mui/material/styles";
import { NumberFormatBase } from "react-number-format";
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
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormatBase
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.floatValue,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      prefix="R$ "
      decimalScale={2}
      fixedDecimalScale
      allowNegative={false}
    />
  );
}

function createData(
  Id,
  Produto,
  QuantidadeRecebida,
  Fornecedor,
  DataDeEntrada,
  NotaFiscal,
  PrecoUnitario,
  ValorTotal,
  Responsavel
) {
  return {
    Id,
    Produto,
    QuantidadeRecebida,
    Fornecedor,
    DataDeEntrada,
    NotaFiscal,
    PrecoUnitario,
    ValorTotal,
    Responsavel
  };
}

const rows = [
  createData(1, 'Teclado', 10, 'Kabum', '2025-06-19', 'NF12345', 'R$ 50,00', 'R$ 500,00', 'João Silva'),
  createData(2, 'Mouse', 20, 'Pichau', '2025-06-18', 'NF12346', 'R$ 30,00', 'R$ 600,00', 'Maria Souza'),
  createData(3, 'Monitor', 5, 'Magazine Luiza', '2025-06-17', 'NF12347', 'R$ 800,00', 'R$ 4.000,00', 'Carlos Lima'),
  createData(4, 'Notebook', 3, 'Dell', '2025-06-16', 'NF12348', 'R$ 2.500,00', 'R$ 7.500,00', 'Ana Paula'),
  createData(5, 'Impressora', 2, 'HP', '2025-06-15', 'NF12349', 'R$ 1.200,00', 'R$ 2.400,00', 'Pedro Santos'),
  createData(6, 'Cabo HDMI', 50, 'Amazon', '2025-06-14', 'NF12350', 'R$ 15,00', 'R$ 750,00', 'Lucas Rocha'),
  createData(7, 'Pen Drive', 40, 'Multilaser', '2025-06-13', 'NF12351', 'R$ 25,00', 'R$ 1.000,00', 'Fernanda Lima'),
  createData(8, 'HD Externo', 8, 'Western Digital', '2025-06-12', 'NF12352', 'R$ 350,00', 'R$ 2.800,00', 'Rafael Costa'),
  createData(9, 'Webcam', 12, 'Logitech', '2025-06-11', 'NF12353', 'R$ 120,00', 'R$ 1.440,00', 'Juliana Alves'),
  createData(10, 'Headset', 15, 'Sony', '2025-06-10', 'NF12354', 'R$ 80,00', 'R$ 1.200,00', 'Bruno Martins'),
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
  {
    id: "ordProduto",
    numeric: false,
    disablePadding: true,
    label: "Ordem"
  },

  {
    id: "Produto",
    numeric: false,
    disablePadding: false,
    label: "Produto"
  },
  {
    id: "QuantidadeRecebida",
    numeric: true,
    disablePadding: false,
    label: "Quantidade Recebida",
  },

  {
    id: "Fornecedor",
    numeric: false,
    disablePadding: false,
    label: "Fornecedor",
  },

  {
    id: "DataDeEntrada",
    numeric: false,
    disablePadding: false,
    label: "Data de Entrada",
  },

  {
    id: "NotaFiscal",
    numeric: false,
    disablePadding: false,
    label: "Nota Fiscal",
  },

  {
    id: "PrecoUnitario",
    numeric: false,
    disablePadding: false,
    label: "Preço Unitário",
  },

  {
    id: "ValorTotal",
    numeric: true,
    disablePadding: false,
    label: "Valor Total",
  },

  {
    id: "Responsavel",
    numeric: false,
    disablePadding: false,
    label: "Responsável",
  },

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

function EnhancedTableToolbar({ numSelected, filter, setFilter, handleOpenDialog, handleCloseDialog, openDialog, unitPrice, handleUnitPriceChange, quantityReceived, setQuantityReceived, totalValue}) {
  const [filterDialogOpen, setFilterDialogOpen] = React.useState(false);
  const [filterCategory, setFilterCategory] = React.useState("");
  const handleFilterDialogOpen = () => setFilterDialogOpen(true);
  const handleFilterDialogClose = () => setFilterDialogOpen(false);
  const applyFilters = () => {   
    console.log("Filtro aplicado:", { filter, filterCategory });
    setFilterDialogOpen(false); 
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
            ENTRADAS
          </Typography>

          <TextField
            variant="outlined"
            size="small"
            placeholder="Pesquisar por entrada"
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
          <Button variant="contained" startIcon={<AddCircleIcon />} sx={{ height: 39, fontWeight: 700, fontFamily: "Montserrat", boxShadow: 0 }} onClick={handleOpenDialog} 
          >Cadastrar Entrada</Button>
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
              <DialogTitle>Cadastrar Entrada</DialogTitle>
              <DialogContent sx={{ display: 'flex', flexDirection: "column", width: 600, gap: 3 }}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="nome-produto"
                  label="Nome do Produto"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  required
                  margin="dense"
                  id="quantidade-recebida"
                  label="Quantidade Recebida"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={quantityReceived}
                  onChange={(e) => setQuantityReceived(e.target.value)}
                />
                <TextField
                  required
                  margin="dense"
                  id="fornecedor"
                  label="Fornecedor"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  required
                  margin="dense"
                  id="data-entrada"
                  type="date"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  required
                  margin="dense"
                  id="nota-fiscal"
                  label="Nota Fiscal"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  required
                  margin="dense"
                  id="preco-unitario"
                  label="Preco Unitário"
                  type="number"
                  value={unitPrice}
                  onChange={handleUnitPriceChange}
                  fullWidth
                  variant="outlined"
                  inputProps={{
                    step: "0.01",
                    min: "0",
                    inputComponent: NumberFormatCustom,
                  }} 
                />
                <TextField
                  required
                  margin="dense"
                  id="valor-total"
                  label="Valor Total"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={totalValue}
                  disabled
                  inputProps={{
                    step: "0.01",
                    min: "0",
                    inputComponent: NumberFormatCustom,
                  }} 
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

          <Dialog open={filterDialogOpen} onClose={handleFilterDialogClose}>
            <DialogTitle>Filtrar Entradas</DialogTitle>
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
                  <MenuItem value="Produto">Produto</MenuItem>
                  <MenuItem value="QuantidadeRecebida">Quantidade Recebida</MenuItem>
                  <MenuItem value="Fornecedor">Fornecedor</MenuItem>
                  <MenuItem value="DataEntrada">Data de Entrada</MenuItem>
                  <MenuItem value="NotaFiscal">Número do Pedido</MenuItem>
                  <MenuItem value="precoUnitario">Preço Unitário</MenuItem>
                  <MenuItem value="ValorTotal">Valor Total</MenuItem>
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
            <DialogActions sx={{ mr: 2, mb: 2 }}>
              <Button variant="outlined" onClick={handleFilterDialogClose} sx={{ fontWeight: 700, fontFamily: "Montserrat", boxShadow: 0 }}>Cancelar</Button>
              <Button variant="contained" onClick={applyFilters} sx={{ fontWeight: 700, fontFamily: "Montserrat", boxShadow: 0 }}>Aplicar</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Toolbar>
  );
}

export default function TelaEntrada() {

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("produto");
  const [selected, setSelected] = React.useState([]);
  const [quantityReceived, setQuantityReceived] = React.useState("");
  const [totalValue, setTotalValue] = React.useState("");
  const [unitPrice, setUnitPrice] = React.useState("");
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filter, setFilter] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const filteredRows = rows.filter(
    (row) =>
      row.Produto.toLowerCase().includes(filter.toLowerCase()) ||
      row.Fornecedor.toLowerCase().includes(filter.toLowerCase()) ||
      row.DataDeEntrada.toLowerCase().includes(filter.toLowerCase()) ||
      row.NotaFiscal.toLowerCase().includes(filter.toLowerCase()) ||
      row.Responsavel.toLowerCase().includes(filter.toLowerCase())
  );

  const handleUnitPriceChange = (event) => {
    setUnitPrice(event.target.value);
  };

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
          quantityReceived={quantityReceived}
          setQuantityReceived={setQuantityReceived}
          totalValue={totalValue}
          setTotalValue={setTotalValue}
          unitPrice={unitPrice}
          handleUnitPriceChange={handleUnitPriceChange}
          numSelected={selected.length}
          filter={filter}
          setFilter={setFilter}
          openDialog={openDialog}
          handleOpenDialog={handleOpenDialog}
          handleCloseDialog={handleCloseDialog} 
        />
        <TableContainer sx={{ minHeight: 600, overflowX: "auto" }}>
          <Table
            sx={{ minWidth: 1000 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              selected={selected}
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
                  const isItemSelected = isSelected(row.Id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.Id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.Id}
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
                        {row.Produto} 
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.QuantidadeRecebida} 
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.Fornecedor} 
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.DataDeEntrada} 
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.NotaFiscal} 
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.PrecoUnitario} 
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.ValorTotal} 
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.Responsavel} 
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

