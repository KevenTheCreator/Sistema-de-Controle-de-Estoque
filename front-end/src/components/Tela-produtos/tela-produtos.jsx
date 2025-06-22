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
import axios from "axios"; 
import Snackbar from "@mui/material/Snackbar"; 
import Alert from "@mui/material/Alert"; 

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
    id: "produto",
    numeric: false,
    disablePadding: false,
    label: "Produto"
  },

  {
    id: "quantidade",
    numeric: true,
    disablePadding: false,
    label: "Quantidade",
  },

  {
    id: "fornecedor",
    numeric: false,
    disablePadding: false,
    label: "Fornecedor",
  },

  {
    id: "codigoProduto",
    numeric: false,
    disablePadding: false,
    label: "Código do produto",
  },

  {
    id: "unidadeMedida",
    numeric: false,
    disablePadding: false,
    label: "Unidade de Medida",
  },

  {
    id: "categoria",
    numeric: false,
    disablePadding: false,
    label: "Categoria",
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

function EnhancedTableToolbar({ 
  numSelected, 
  selected,
  filter, 
  setFilter, 
  handleOpenDialog, 
  handleCloseDialog, 
  openDialog, 
  handleCreateProduct, 
  handleEditProduct, 
  handleDeleteProducts
}) {

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
            PRODUTOS
          </Typography>

          <TextField
            variant="outlined"
            size="small"
            placeholder="Pesquisar por produto"
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
          >Cadastrar Produto</Button>
          <React.Fragment>
            <Dialog open={openDialog} onClose={handleCloseDialog}
              slotProps={{
                paper: {
                  component: 'form',
                  onSubmit: handleCreateProduct, 
                },
              }}
            >
              <DialogTitle>Cadastrar Produto</DialogTitle>
              <DialogContent sx={{ display: 'flex', flexDirection: "column", width: 600, gap: 3 }}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="product-name"
                  name="produto" 
                  label="Nome do Produto"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  required
                  margin="dense"
                  id="quantity"
                  name="quantidade" 
                  label="Quantidade"
                  type="number"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  required
                  margin="dense"
                  id="supplier"
                  name="fornecedor" 
                  label="Fornecedor"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  required
                  margin="dense"
                  id="product-code"
                  name="codigoProduto" 
                  label="Código do Produto"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
                <FormControl fullWidth margin="dense">
                  <InputLabel id="unit-label">Unidade de Medida</InputLabel>
                  <Select
                    labelId="unit-label"
                    id="unit"
                    name="unidadeMedida" 
                    label="Unidade de Medida"
                    defaultValue=""
                  >
                    <MenuItem value="un">Unidade</MenuItem>
                    <MenuItem value="kg">Kg</MenuItem>
                    <MenuItem value="g">Gramas</MenuItem>
                    <MenuItem value="l">Litros</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="category-label">Categoria</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category"
                    name="categoria" 
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
            <span>
              <IconButton onClick={handleEditProduct} disabled={selected.length !== 1}>
                <EditIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Excluir">
            <span>
              <IconButton onClick={handleDeleteProducts} disabled={selected.length === 0}>
                <DeleteIcon />
              </IconButton>
            </span>
          </Tooltip>
        </>
      ) : (
        ""
      )}
    </Toolbar>
  );
}

export default function Telaprodutos() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filter, setFilter] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [rows, setRows] = React.useState([]); 
  const [snackbar, setSnackbar] = React.useState({ open: false, message: "", severity: "success" });
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [editProduct, setEditProduct] = React.useState(null);
  const [filterField, setFilterField] = React.useState("produto");
  const [filterOrder, setFilterOrder] = React.useState("ascendente");

  React.useEffect(() => {
    axios.get("http://localhost:8080/api/produtos")
      .then((response) => setRows(response.data))
      .catch((error) => console.error("Erro ao buscar produtos:", error));
  }, []);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleCreateProduct = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newProduct = Object.fromEntries(formData.entries());

    newProduct.quantidade = parseInt(newProduct.quantidade, 10);

    axios.post("http://localhost:8080/api/produtos", newProduct)
      .then((response) => {
        setRows((prevRows) => [...prevRows, response.data]);
        handleCloseDialog();
        setSnackbar({ open: true, message: "Produto cadastrado com sucesso!", severity: "success" });
      })
      .catch((error) => {
        console.error("Erro ao cadastrar produto:", error);
        setSnackbar({ open: true, message: "Erro ao cadastrar produto.", severity: "error" });
      });
  };

  const handleEditProduct = () => {
    if (selected.length !== 1) {
      setSnackbar({ open: true, message: "Selecione apenas um produto para editar.", severity: "warning" });
      return;
    }
    const product = rows.find((row) => row.id === selected[0]);
    if (!product) {
      setSnackbar({ open: true, message: "Produto não encontrado.", severity: "error" });
      return;
    }
    setEditProduct(product);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setEditProduct(null);
    setSelected([]);
  };

  const handleUpdateProduct = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const updated = Object.fromEntries(formData.entries());
    updated.quantidade = parseInt(updated.quantidade, 10);

    axios.put(`http://localhost:8080/api/produtos/${editProduct.id}`, updated)
      .then((response) => {
        setRows((prevRows) =>
          prevRows.map((row) => (row.id === editProduct.id ? response.data : row))
        );
        setSnackbar({ open: true, message: "Produto editado com sucesso!", severity: "success" });
        handleCloseEditDialog();
      })
      .catch((error) => {
        console.error("Erro ao editar produto:", error);
        setSnackbar({ open: true, message: "Erro ao editar produto.", severity: "error" });
      });
  };

  const handleDeleteProducts = () => {
    if (selected.length === 0) {
      setSnackbar({ open: true, message: "Selecione pelo menos um produto para excluir.", severity: "warning" });
      return;
    }

    Promise.all(selected.map((id) => axios.delete(`http://localhost:8080/api/produtos/${id}`)))
      .then(() => {
        setRows((prevRows) => prevRows.filter((row) => !selected.includes(row.id)));
        setSnackbar({ open: true, message: "Produto(s) excluído(s) com sucesso!", severity: "success" });
        setSelected([]);
      })
      .catch((error) => {
        console.error("Erro ao excluir produto(s):", error);
        setSnackbar({ open: true, message: "Erro ao excluir produto(s).", severity: "error" });
      });
  };

  const filteredRows = rows.filter(
    (row) =>
      row.produto.toLowerCase().includes(filter.toLowerCase()) ||
      row.quantidade.toLowerCase().includes(filter.toLowerCase()) ||
      row.fornecedor.toLowerCase().includes(filter.toLowerCase()) ||
      row.codigoProduto.toLowerCase().includes(filter.toLowerCase()) ||
      row.unidadeMedida.toLowerCase().includes(filter.toLowerCase()) ||
      row.categoria.toLowerCase().includes(filter.toLowerCase()) 
  );

  const applyFilters = () => {
    setOrderBy(filterField);
    setOrder(filterOrder === "ascendente" ? "asc" : "desc");
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
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
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
          selected={selected} 
          filter={filter}
          setFilter={setFilter}
          openDialog={openDialog}
          handleOpenDialog={handleOpenDialog}
          handleCloseDialog={handleCloseDialog}
          handleCreateProduct={handleCreateProduct}
          handleEditProduct={handleEditProduct}
          handleDeleteProducts={handleDeleteProducts}
          filterField={filterField}
          setFilterField={setFilterField}
          filterOrder={filterOrder}
          setFilterOrder={setFilterOrder}
          applyFilters={applyFilters}
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
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.quantidade} 
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.fornecedor} 
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.codigoProduto} 
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.unidadeMedida} 
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.categoria} 
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

      <Dialog open={editDialogOpen} onClose={handleCloseEditDialog}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: handleUpdateProduct,
          },
        }}
      >
        <DialogTitle>Editar Produto</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: "column", width: 600, gap: 3 }}>
          <TextField
            autoFocus
            required
            margin="dense"
            id="product-name-edit"
            name="produto"
            label="Nome do Produto"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={editProduct?.produto || ""}
          />
          <TextField
            required
            margin="dense"
            id="quantity-edit"
            name="quantidade"
            label="Quantidade"
            type="number"
            fullWidth
            variant="outlined"
            defaultValue={editProduct?.quantidade || ""}
          />
          <TextField
            required
            margin="dense"
            id="supplier-edit"
            name="fornecedor"
            label="Fornecedor"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={editProduct?.fornecedor || ""}
          />
          <TextField
            required
            margin="dense"
            id="product-code-edit"
            name="codigoProduto"
            label="Código do Produto"
            type="text"
            fullWidth
            variant="outlined"
            defaultValue={editProduct?.codigoProduto || ""}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="unit-label-edit">Unidade de Medida</InputLabel>
            <Select
              labelId="unit-label-edit"
              id="unit-edit"
              name="unidadeMedida"
              label="Unidade de Medida"
              defaultValue={editProduct?.unidadeMedida || ""}
            >
              <MenuItem value="un">Unidade</MenuItem>
              <MenuItem value="kg">Kg</MenuItem>
              <MenuItem value="g">Gramas</MenuItem>
              <MenuItem value="l">Litros</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel id="category-label-edit">Categoria</InputLabel>
            <Select
              labelId="category-label-edit"
              id="category-edit"
              name="categoria"
              label="Categoria"
              defaultValue={editProduct?.categoria || ""}
            >
              <MenuItem value="perifericos">Periféricos</MenuItem>
              <MenuItem value="monitores">Monitores</MenuItem>
              <MenuItem value="computadores">Computadores</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions sx={{ mr: 2, mb: 2 }}>
          <Button variant="outlined" onClick={handleCloseEditDialog} sx={{ fontWeight: 700, fontFamily: "Montserrat", boxShadow: 0 }}>Cancelar</Button>
          <Button variant="contained" type="submit" sx={{ fontWeight: 700, fontFamily: "Montserrat", boxShadow: 0 }}>Salvar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
