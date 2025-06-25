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
import AddCircleIcon from "@mui/icons-material/AddCircle";
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
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import axios from "../../api/axiosConfig";

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
    id: "ord",
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
    id: "quantidadeRetirada",
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
    id: "dataDevolucao",
    numeric: false,
    disablePadding: false,
    label: "Data de Devolução",
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
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status"
  },
];

function StatusChips() {
  return (
    <Stack direction="row" spacing={1} justifyContent="center">
      <Chip label="Entregue" color="success" />
    </Stack>
  );
}

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
  filter,
  setFilter,
  handleOpenDialog,
  handleCloseDialog,
  openDialog,
  handleCreateDispatch,
  handleDeleteDispatch,
  handleEdit,
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
        <Typography
          sx={{ width: "100%", fontFamily: "Montserrat" }}
          color="inherit"
          variant="subtitle1"
        >
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
          <Button
            variant="contained"
            startIcon={<AddCircleIcon />}
            sx={{
              height: 39,
              fontWeight: 700,
              fontFamily: "Montserrat",
              boxShadow: 0,
            }}
            onClick={handleOpenDialog} 
          >
            Cadastrar Saída
          </Button>
          <React.Fragment>
            <Dialog
              open={openDialog}
              onClose={handleCloseDialog}
              slotProps={{
                paper: {
                  component: "form",
                  onSubmit: (event) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const dispatchData = {
                      produto: formData.get("nome-produto"),
                      quantidadeRetirada: Number(formData.get("quantidade-retirada")),
                      dataSaida: formData.get("data-saida"),
                      dataDevolucao: formData.get("data-devolucao"),
                      nomeSolicitante: formData.get("nome-solicitante"),
                      tipoSolicitante: formData.get("tipo-solicitante"),
                      destino: formData.get("destino"),
                      status: "Entregue"
                    };
                    handleCreateDispatch(dispatchData);
                    handleCloseDialog();
                  },
                },
              }}
            >
              <DialogTitle>Cadastrar Saída</DialogTitle>
              <DialogContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: 600,
                  gap: 3,
                }}
              >
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="nome-produto"
                  name="nome-produto" 
                  label="Nome do Produto"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  required
                  margin="dense"
                  id="quantidade-retirada"
                  name="quantidade-retirada" 
                  label="Quantidade Retirada"
                  type="number"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  required
                  margin="dense"
                  id="data-saida"
                  name="data-saida" 
                  type="date"
                  label="Data de Saída"
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  margin="dense"
                  id="data-devolucao"
                  name="data-devolucao" 
                  type="date"
                  label="Data de Devolução"
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  required
                  margin="dense"
                  id="nome-solicitante"
                  name="nome-solicitante" 
                  label="Nome do Solicitante"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
                <FormControl fullWidth margin="dense">
                  <InputLabel id="tipo-solicitante-label" required>
                    Tipo de Solicitante
                  </InputLabel>
                  <Select
                    labelId="tipo-solicitante-label"
                    id="tipo-solicitante"
                    name="tipo-solicitante" 
                    label="Tipo de Solicitante"
                    defaultValue=""
                  >
                    <MenuItem value="Funcionário">Funcionário</MenuItem>
                    <MenuItem value="Discente">Discente</MenuItem>
                    <MenuItem value="Docente">Docente</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth margin="dense">
                  <InputLabel id="destino-label" required>Destino</InputLabel>
                  <Select
                    labelId="destino-label"
                    id="destino"
                    name="destino" 
                    label="Destino"
                    defaultValue=""
                  >
                    <MenuItem value="Laboratório">Laboratório</MenuItem>
                    <MenuItem value="Escritório">Escritório</MenuItem>
                    <MenuItem value="Galpão">Galpão</MenuItem>
                  </Select>
                </FormControl>
              </DialogContent>

              <DialogActions sx={{ mr: 2, mb: 2 }}>
                <Button
                  variant="outlined"
                  onClick={handleCloseDialog}
                  sx={{
                    fontWeight: 700,
                    fontFamily: "Montserrat",
                    boxShadow: 0,
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{
                    fontWeight: 700,
                    fontFamily: "Montserrat",
                    boxShadow: 0,
                  }}
                >
                  Cadastrar
                </Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        </>
      )}

      {numSelected > 0 ? (
        <>
          <Tooltip title="Editar">
            <IconButton onClick={handleEdit} disabled={numSelected !== 1}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir">
            <IconButton onClick={handleDeleteDispatch} disabled={numSelected === 0}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        ""
      )}
    </Toolbar>
  );
}

export default function TelaSaidas() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filter, setFilter] = React.useState("");
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [editData, setEditData] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [snackbar, setSnackbar] = React.useState({ open: false, message: "", severity: "success" });
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

  // Carregar saídas do backend
  React.useEffect(() => {
    axios.get("/saidas")
      .then(response => setRows(response.data))
      .catch(() => setSnackbar({ open: true, message: "Erro ao buscar saídas!", severity: "error" }));
  }, []);

  // Função para criar nova saída
  const handleCreateDispatch = (dispatchData) => {
    axios.post("/saidas", dispatchData)
      .then(response => {
        setRows(prev => [...prev, response.data]);
        setSnackbar({ open: true, message: "Saída cadastrada!", severity: "success" });
      })
      .catch(() => setSnackbar({ open: true, message: "Erro ao cadastrar saída!", severity: "error" }));
  };

  // Função para abrir o diálogo de edição
  const handleEdit = () => {
      if (selected.length !== 1) return;
      const row = rows.find(r => r.id === selected[0]);
      setEditData(row);
      setEditDialogOpen(true);
  };

  // Função para editar saída
  const handleEditDispatch = (dispatchData) => {
    axios.put(`/saidas/${editData.id}`, dispatchData)
      .then(response => {
        setRows(prev => prev.map(row => row.id === editData.id ? response.data : row));
        setSnackbar({ open: true, message: "Saída atualizada!", severity: "success" });
        setEditDialogOpen(false);
        setEditData(null);
        setSelected([]);
      })
      .catch(() => setSnackbar({ open: true, message: "Erro ao atualizar saída!", severity: "error" }));
  };

  // Função para deletar saída
  const handleDeleteDispatch = () => {
    if (selected.length === 0) return;
    Promise.all(selected.map(id => axios.delete(`/saidas/${id}`)))
      .then(() => {
        setRows(prev => prev.filter(row => !selected.includes(row.id)));
        setSnackbar({ open: true, message: "Saídas excluídas com sucesso!", severity: "success" });
        setSelected([]);
      })
      .catch(() => {
        setSnackbar({ open: true, message: "Erro ao excluir saídas!", severity: "error" });
      });
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
        <EnhancedTableToolbar
          numSelected={selected.length}
          filter={filter}
          setFilter={setFilter}
          openDialog={openDialog} 
          handleOpenDialog={handleOpenDialog} 
          handleCloseDialog={handleCloseDialog} 
          handleCreateDispatch={handleCreateDispatch}
          handleDeleteDispatch={handleDeleteDispatch}
          handleEdit={handleEdit}
          selected={selected}
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
                        {row.quantidadeRetirada}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 120 }}>
                        {row.dataSaida}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.dataDevolucao ? row.dataDevolucao : "Sem retorno"}
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
                      <TableCell align="center" sx={{ minWidth: 100 }}>
                        <StatusChips row={row} />
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

    <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: (event) => {
              event.preventDefault();
              const data = new FormData(event.currentTarget);
              const dispatchData = {
                produto: data.get("nome-produto"),
                quantidadeRetirada: Number(data.get("quantidade-retirada")),
                dataSaida: data.get("data-saida"),
                dataDevolucao: data.get("data-devolucao"),
                nomeSolicitante: data.get("nome-solicitante"),
                tipoSolicitante: data.get("tipo-solicitante"),
                destino: data.get("destino"),
                status: "Entregue"
              };
              handleEditDispatch(dispatchData);
            }
          }
        }}
      >
      <DialogTitle>Editar Saída</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", width: 600, gap: 3 }}>
        <TextField
          autoFocus
          required
          margin="dense"
          id="nome-produto"
          name="nome-produto"
          label="Nome do Produto"
          type="text"
          fullWidth
          variant="outlined"
          defaultValue={editData?.produto || ""}
        />
        <TextField
          required
          margin="dense"
          id="quantidade-retirada"
          name="quantidade-retirada"
          label="Quantidade Retirada"
          type="number"
          fullWidth
          variant="outlined"
          defaultValue={editData?.quantidadeRetirada || ""}
        />
        <TextField
          required
          margin="dense"
          id="data-saida"
          name="data-saida"
          type="date"
          fullWidth
          variant="outlined"
          defaultValue={editData?.dataSaida || ""}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="dense"
          id="data-devolucao"
          name="data-devolucao"
          type="date"
          fullWidth
          variant="outlined"
          defaultValue={editData?.dataDevolucao || ""}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          required
          margin="dense"
          id="nome-solicitante"
          name="nome-solicitante"
          label="Nome do Solicitante"
          type="text"
          fullWidth
          variant="outlined"
          defaultValue={editData?.nomeSolicitante || ""}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel id="tipo-solicitante-label" required>
            Tipo de Solicitante
          </InputLabel>
          <Select
            labelId="tipo-solicitante-label"
            id="tipo-solicitante"
            name="tipo-solicitante"
            label="Tipo de Solicitante"
            defaultValue={editData?.tipoSolicitante || ""}
          >
            <MenuItem value="Funcionário">Funcionário</MenuItem>
            <MenuItem value="Discente">Discente</MenuItem>
            <MenuItem value="Docente">Docente</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="dense">
          <InputLabel id="destino-label" required>Destino</InputLabel>
          <Select
            labelId="destino-label"
            id="destino"
            name="destino"
            label="Destino"
            defaultValue={editData?.destino || ""}
          >
            <MenuItem value="Laboratório">Laboratório</MenuItem>
            <MenuItem value="Escritório">Escritório</MenuItem>
            <MenuItem value="Galpão">Galpão</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ mr: 2, mb: 2 }}>
        <Button
          variant="outlined"
          onClick={() => setEditDialogOpen(false)}
          sx={{
            fontWeight: 700,
            fontFamily: "Montserrat",
            boxShadow: 0,
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          type="submit"
          sx={{
            fontWeight: 700,
            fontFamily: "Montserrat",
            boxShadow: 0,
          }}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
    </Box>
  );
}
