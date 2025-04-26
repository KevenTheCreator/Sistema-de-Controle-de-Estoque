import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import TextField from '@mui/material/TextField';

function createData(id, produto, quantidadeRet, dataSaida, dataEntrega, codProduto, tipoSolicitante, status) {
    return { id, produto, quantidadeRet, dataSaida, dataEntrega, codProduto, tipoSolicitante, status };
}

const rows = [
    createData(1, 'Mouse Logitech', 3, '2024-03-10', '2024-03-15', 'ML123', 'Interno', 'Entregue'),
    createData(2, 'Ak 47', 2, '2024-04-01', '2024-04-05', 'TD456', 'Externo', 'Pendente'),
    createData(3, 'Fuzil .762', 1, '2024-04-10', '2024-04-20', 'MN789', 'Interno', 'Em andamento'),
    createData(4, 'Notebook HP', 5, '2024-04-12', '2024-04-18', 'NB321', 'Interno', 'Entregue'),
    createData(5, 'Headset JBL', 4, '2024-03-22', '2024-03-29', 'HS654', 'Externo', 'Cancelado'),
    createData(6, 'Headset JBL', 4, '2024-03-22', '2024-03-29', 'HS654', 'Externo', 'Cancelado'),
    createData(7, 'Headset JBL', 4, '2024-03-22', '2024-03-29', 'HS654', 'Externo', 'Cancelado'),
    createData(8, 'Headset JBL', 4, '2024-03-22', '2024-03-29', 'HS654', 'Externo', 'Cancelado'),
    createData(9, 'Headset JBL', 4, '2024-03-22', '2024-03-29', 'HS654', 'Externo', 'Cancelado'),
    createData(10, 'Metralhadora .50', 4, '2024-03-22', '2024-03-29', 'HS654', 'Externo', 'Cancelado'),
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
    
const headCells = [
    { id: 'ord', numeric: false, disablePadding: true, label: 'Ordem' },
    { id: 'produto', numeric: false, disablePadding: false, label: 'Produto' },
    { id: 'quantidadeRet', numeric: true, disablePadding: false, label: 'Quantidade Retirada' },
    { id: 'dataSaida', numeric: false, disablePadding: false, label: 'Data Saída' },
    { id: 'dataEntrega', numeric: false, disablePadding: false, label: 'Data Entrega' },
    { id: 'codProduto', numeric: false, disablePadding: false, label: 'Código do Produto' },
    { id: 'tipoSolicitante', numeric: false, disablePadding: false, label: 'Tipo de Solicitante' },
    { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
];

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => onRequestSort(event, property);

    return (
        <TableHead sx={{position: 'relative'}}>
            <TableRow sx={{ backgroundColor: '#0066FF' }}>
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
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        sx={{ fontWeight: 'bold', color: 'white'}}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            sx={{ color: 'white', paddingLeft:3 }}
                        >
                            {headCell.label}
                            {orderBy === headCell.id && (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'ordenado decrescente' : 'ordenado crescente'}
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
                    display: 'flex',
                    position: 'relative',
                    alignItems: 'center',
                    gap: 2,
                },
                numSelected > 0 && {
                    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                },
            ]}
        >
            {numSelected > 0 ? (
                <Typography sx={{ width: '100%' }} color="inherit" variant="subtitle1">
                    {numSelected} selecionado(s)
                </Typography>
            ) : (
                <>
                    <Typography variant="h6" color="black" align="center">
                        SOLICITANTES
                    </Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Pesquisar por solicitante..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        sx={{ width: 300, ml: 'auto',  }}
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
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('produto');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [filter, setFilter] = React.useState('');

    const filteredRows = rows.filter((row) =>
        row.tipoSolicitante.toLowerCase().includes(filter.toLowerCase())
    );

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
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
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '90%', mb: 2, borderRadius: 2, p: 2, mt: 10, mx: 'auto' }}>
                <EnhancedTableToolbar numSelected={selected.length} filter={filter} setFilter={setFilter} />
                <TableContainer>
                    <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
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
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row" align='center'>
                                                {index + 1}
                                            </TableCell>
                                            <TableCell align="center">{row.produto}</TableCell>
                                            <TableCell align="center">{row.quantidadeRet}</TableCell>
                                            <TableCell align="center">{row.dataSaida}</TableCell>
                                            <TableCell align="center">{row.dataEntrega}</TableCell>
                                            <TableCell align="center">{row.codProduto}</TableCell>
                                            <TableCell align="center">{row.tipoSolicitante}</TableCell>
                                            <TableCell align="center">{row.status}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={9} />
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
