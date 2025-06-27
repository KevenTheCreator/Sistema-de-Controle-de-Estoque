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
import { visuallyHidden } from "@mui/utils";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from '../../api/axiosConfig';

// Formatação customizada para campo de moeda
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

// Cabeçalhos da tabela de entradas
const headCells = [
  { id: "ordProduto", numeric: false, disablePadding: true, label: "Ordem" },
  { id: "produto", numeric: false, disablePadding: false, label: "Produto" },
  { id: "quantidadeRecebida", numeric: true, disablePadding: false, label: "Quantidade Recebida" },
  { id: "fornecedor", numeric: false, disablePadding: false, label: "Fornecedor" },
  { id: "dataDeEntrada", numeric: false, disablePadding: false, label: "Data de Entrada" },
  { id: "notaFiscal", numeric: false, disablePadding: false, label: "Nota Fiscal" },
  { id: "precoUnitario", numeric: false, disablePadding: false, label: "Preço Unitário" },
  { id: "valorTotal", numeric: true, disablePadding: false, label: "Valor Total" },
  { id: "responsavel", numeric: false, disablePadding: false, label: "Responsável" },
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

// Barra de ferramentas acima da tabela (pesquisa, cadastrar, editar, excluir)
function EnhancedTableToolbar({
  numSelected,
  filter,
  setFilter,
  handleOpenDialog,
  handleCloseDialog,
  openDialog,
  unitPrice,
  handleUnitPriceChange,
  quantityReceived,
  setQuantityReceived,
  totalValue,
  onEdit,
  onDelete,
  selected,
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
      {/* Exibe quantidade selecionada ou título */}
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
            ENTRADAS
          </Typography>
          {/* Campo de pesquisa */}
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
          {/* Botão para abrir o diálogo de cadastro */}
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
            Cadastrar Entrada
          </Button>
          {/* Diálogo de cadastro de entrada */}
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
                    const formJson = Object.fromEntries(formData.entries());
                    const email = formJson.email;
                    console.log(email);
                  },
                },
              }}
            >
              <DialogTitle>Cadastrar Entrada</DialogTitle>
              <DialogContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: 600,
                  gap: 3,
                }}
              >
                {/* Campos do formulário de cadastro */}
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="nome-produto"
                  label="Nome do Produto"
                  name="nome-produto"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  required
                  margin="dense"
                  id="quantidade-recebida"
                  label="Quantidade Recebida"
                  name="quantidade-recebida"
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
                  name="fornecedor"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
                <TextField
                  required
                  margin="dense"
                  id="data-entrada"
                  name="data-entrada" 
                  type="date"
                  label="Data de Entrada"
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
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

      {/* Botões de editar e excluir quando há seleção */}
      {numSelected > 0 ? (
        <>
          <Tooltip title="Editar">
            <IconButton onClick={onEdit} disabled={selected.length !== 1}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Excluir">
            <IconButton onClick={onDelete} disabled={selected.length === 0}>
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

// Componente principal da tela de entradas
export default function TelaEntrada() {
  // Estados principais
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [quantityReceived, setQuantityReceived] = React.useState("");
  const [totalValue, setTotalValue] = React.useState("");
  const [unitPrice, setUnitPrice] = React.useState("");
  const [snackbar, setSnackbar] = React.useState({ open: false, message: "", severity: "success" });
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);
  const [filter, setFilter] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [editData, setEditData] = React.useState(null);

  // Carrega entradas do backend ao montar o componente
  React.useEffect(() => {
    axios.get("/entradas")
      .then((response) => setRows(response.data))
      .catch(() => {
        setSnackbar({ open: true, message: "Erro ao buscar entradas!", severity: "error" });
      });
  }, []);

  // Atualiza valor total automaticamente ao alterar quantidade ou preço unitário
  React.useEffect(() => {
    const quantidade = parseFloat(quantityReceived) || 0;
    const preco = parseFloat(unitPrice) || 0;
    setTotalValue((quantidade * preco).toFixed(2));
  }, [quantityReceived, unitPrice]);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  // Cadastra nova entrada
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

     // Verificação de nota fiscal duplicada
    const notaFiscal = data.get("nota-fiscal");
    const notaDuplicada = rows.some(row => row.notaFiscal === notaFiscal);
      if (notaDuplicada) {
        setSnackbar({ open: true, message: "Já existe uma entrada com essa nota fiscal!", severity: "error" });
        return;
      }

    const quantidade = Number(data.get("quantidade-recebida"));
    const preco = Number(data.get("preco-unitario"));
    const valorTotalCalculado = quantidade * preco;

    const newEntry = {
      produto: data.get("nome-produto"),
      quantidadeRecebida: quantidade,
      fornecedor: data.get("fornecedor"),
      dataDeEntrada: data.get("data-entrada"),
      notaFiscal: data.get("nota-fiscal"),
      precoUnitario: preco,
      valorTotal: valorTotalCalculado,
      responsavel: data.get("responsavel"),
    };

    axios.post("/entradas", newEntry)
      .then(response => {
        setRows(prev => [...prev, response.data]);
        setSnackbar({ open: true, message: "Entrada cadastrada com sucesso!", severity: "success" });
        setOpenDialog(false);
        setQuantityReceived("");
        setUnitPrice("");
        setTotalValue("");
      })
      .catch(() => {
        setSnackbar({ open: true, message: "Erro ao cadastrar entrada!", severity: "error" });
      });
  }

  // Exclui entradas selecionadas
  const handleDelete = () => {
    if (selected.length === 0) return;
    Promise.all(selected.map(id => axios.delete(`/entradas/${id}`)))
      .then(() => {
        setRows(prev => prev.filter(row => !selected.includes(row.id)));
        setSnackbar({ open: true, message: "Entradas excluídas com sucesso!", severity: "success" });
        setSelected([]);
      })
      .catch(() => {
        setSnackbar({ open: true, message: "Erro ao excluir entradas!", severity: "error" });
      });
  };

  // Abre diálogo de edição
  const handleEdit = () => {
    if (selected.length !== 1) return;
    const row = rows.find(r => r.id === selected[0]);
    setEditData(row);
    setEditDialogOpen(true);
  };

  // Salva edição da entrada
  const handleEditSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const quantidade = Number(data.get("quantidade-recebida"));
    const preco = Number(data.get("preco-unitario"));
    const valorTotalCalculado = quantidade * preco;

    const updatedEntry = {
      ...editData,
      produto: data.get("nome-produto"),
      quantidadeRecebida: quantidade,
      fornecedor: data.get("fornecedor"),
      dataDeEntrada: data.get("data-entrada"),
      notaFiscal: data.get("nota-fiscal"),
      precoUnitario: preco,
      valorTotal: valorTotalCalculado,
      responsavel: data.get("responsavel"),
    };

    axios.put(`/entradas/${editData.id}`, updatedEntry)
      .then(response => {
        setRows(prev => prev.map(row => row.id === editData.id ? response.data : row));
        setSnackbar({ open: true, message: "Entrada atualizada com sucesso!", severity: "success" });
        setEditDialogOpen(false);
        setEditData(null);
        setSelected([]);
      })
      .catch(() => {
        setSnackbar({ open: true, message: "Erro ao atualizar entrada!", severity: "error" });
      });
  };

  // Filtro de pesquisa
  const filteredRows = rows.filter(
    (row) =>
      (row.produto || "").toLowerCase().includes(filter.toLowerCase()) ||
      (row.fornecedor || "").toLowerCase().includes(filter.toLowerCase()) ||
      (row.dataDeEntrada || "").toLowerCase().includes(filter.toLowerCase()) ||
      (row.notaFiscal || "").toLowerCase().includes(filter.toLowerCase()) ||
      (row.responsavel || "").toLowerCase().includes(filter.toLowerCase())
  );

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
          quantityReceived={quantityReceived}
          setQuantityReceived={setQuantityReceived}
          totalValue={totalValue}
          setTotalValue={setTotalValue}
          unitPrice={unitPrice}
          handleUnitPriceChange={e => setUnitPrice(e.target.value)}
          numSelected={selected.length}
          filter={filter}
          setFilter={setFilter}
          openDialog={openDialog}
          handleOpenDialog={handleOpenDialog}
          handleCloseDialog={handleCloseDialog}
          onEdit={handleEdit}
          onDelete={handleDelete}
          selected={selected}
        />
        {/* Diálogo de cadastro de entrada */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          slotProps={{
            paper: {
              component: "form",
              onSubmit: handleSubmit,
            },
          }}
        >
          <DialogTitle>Cadastrar Entrada</DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              width: 600,
              gap: 3,
            }}
          >
            {/* Campos do formulário de cadastro */}
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
              id="quantidade-recebida"
              name="quantidade-recebida"
              label="Quantidade Recebida"
              type="number"
              fullWidth
              variant="outlined"
              value={quantityReceived}
              onChange={e => setQuantityReceived(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              id="fornecedor"
              name="fornecedor"
              label="Fornecedor"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              required
              margin="dense"
              id="data-entrada"
              name="data-entrada"
              type="date"
              fullWidth
              variant="outlined"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              required
              margin="dense"
              id="nota-fiscal"
              name="nota-fiscal"
              label="Nota Fiscal"
              type="text"
              fullWidth
              variant="outlined"
            />
            <TextField
              required
              margin="dense"
              id="preco-unitario"
              name="preco-unitario"
              label="Preco Unitário"
              type="number"
              value={unitPrice}
              onChange={e => setUnitPrice(e.target.value)}
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
              name="valor-total"
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
              name="responsavel"
              label="Responsável"
              type="text"
              fullWidth
              variant="outlined"
            />
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
        {/* Diálogo de edição de entrada */}
        <Dialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          slotProps={{
            paper: {
              component: "form",
              onSubmit: handleEditSubmit,
            },
          }}
        >
          <DialogTitle>Editar Entrada</DialogTitle>
          <DialogContent sx={{ display: "flex", flexDirection: "column", width: 600, gap: 3 }}>
            {/* Campos do formulário de edição */}
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
              id="quantidade-recebida"
              name="quantidade-recebida"
              label="Quantidade Recebida"
              type="number"
              fullWidth
              variant="outlined"
              defaultValue={editData?.quantidadeRecebida || ""}
              onChange={e => setQuantityReceived(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              id="fornecedor"
              name="fornecedor"
              label="Fornecedor"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={editData?.fornecedor || ""}
            />
            <TextField
              required
              margin="dense"
              id="data-entrada"
              name="data-entrada"
              type="date"
              fullWidth
              variant="outlined"
              defaultValue={editData?.dataDeEntrada || ""}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              required
              margin="dense"
              id="nota-fiscal"
              name="nota-fiscal"
              label="Nota Fiscal"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={editData?.notaFiscal || ""}
            />
            <TextField
              required
              margin="dense"
              id="preco-unitario"
              name="preco-unitario"
              label="Preco Unitário"
              type="number"
              defaultValue={editData?.precoUnitario || ""}
              onChange={e => setUnitPrice(e.target.value)}
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
              name="valor-total"
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
              name="responsavel"
              label="Responsável"
              type="text"
              fullWidth
              variant="outlined"
              defaultValue={editData?.responsavel || ""}
            />
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
        {/* Tabela de entradas */}
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
                      <TableCell component="th" id={labelId} scope="row" align="center" sx={{ minWidth: 50 }}>
                        {index + 1}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.produto}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.quantidadeRecebida}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.fornecedor}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.dataDeEntrada}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.notaFiscal}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.precoUnitario !== undefined && row.precoUnitario !== null
                          ? row.precoUnitario.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                          : ""}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.valorTotal !== undefined && row.valorTotal !== null
                          ? row.valorTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
                          : ""}
                      </TableCell>
                      <TableCell align="center" sx={{ minWidth: 150 }}>
                        {row.responsavel}
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
