import React from 'react';
import { Box } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AssignmentIcon from '@mui/icons-material/Assignment';
import WidgetsIcon from '@mui/icons-material/Widgets';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { Link } from 'react-router-dom';
import './tela-inicial.css';
import axios from '../../api/axiosConfig';

export default function TelaInicial() {
    const [custoTotal, setCustoTotal] = React.useState(0);
    const [quantidadeTotal, setQuantidadeTotal] = React.useState(0);
    const [produtosBaixoEstoque, setProdutosBaixoEstoque] = React.useState(0);

 React.useEffect(() => {
  axios.get("/entradas")
    .then(response => {
      const entradas = response.data;
      const total = entradas.reduce((acc, entrada) => acc + (entrada.valorTotal || 0), 0);
      const quantidade = entradas.reduce((acc, entrada) => acc + (entrada.quantidadeRecebida || 0), 0);
      const produtosBaixo = entradas.filter(e => e.quantidadeRecebida < 10).length;
      setCustoTotal(total);
      setQuantidadeTotal(quantidade);
      setProdutosBaixoEstoque(produtosBaixo);
    })
    .catch(() => {
      setCustoTotal(0);
      setQuantidadeTotal(0);
      setProdutosBaixoEstoque(0);
    });
}, []);
  return (
    <Box
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
      gap={2}
      sx={{ padding: { xs: 2, md: 10 }, minHeight: '85vh' }}
    >
      <Box
        sx={{
          width: { xs: '100%', md: '48%', lg: '30%' },
          maxWidth: '557px',
          height: { xs: '200px', md: '300px' },
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexDirection: 'column',
          justifyContent: 'center',
          color: 'white',
          borderRadius: 2,
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
          textAlign: { xs: 'center' },
        }}
      >
        <WarningIcon sx={{ fontSize: 70, color: "red" }} />
        <h3 className="cardP">PRODUTOS COM ESTOQUE BAIXO</h3>
        <h3 style={{ color: 'black' }}>
          {produtosBaixoEstoque}
        </h3>
      </Box>

      <Box
        sx={{
          width: { xs: '100%', md: '48%', lg: '30%' },
          maxWidth: '557px',
          height: { xs: '200px', md: '300px' },
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexDirection: 'column',
          justifyContent: 'center',
          color: 'white',
          borderRadius: 2,
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
          textAlign: { xs: 'center' }
        }}
      >
        <AssignmentIcon sx={{ className: "card-estoque", fontSize: 70, color: "green" }} />
        <h3 className="cardQ">QUANTIDADE DE PRODUTOS NO ESTOQUE</h3>
        <h3 style={{ color: 'black' }}>
          {quantidadeTotal}
        </h3>
      </Box>

      <Box
        sx={{
          width: { xs: '100%', md: '48%', lg: '30%' },
          maxWidth: '557px',
          height: { xs: '200px', md: '300px' },
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexDirection: 'column',
          justifyContent: 'center',
          color: 'white',
          borderRadius: 2,
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
          textAlign: { xs: 'center' }
        }}
      >
        <AttachMoneyIcon sx={{ className: "card-estoque", fontSize: 70, color: "blue" }} />
        <h3 className="cardC">CUSTO TOTAL DE PRODUTOS DO ESTOQUE</h3>
        <h3 style={{ color: 'black' }}>
            {custoTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        </h3>
      </Box>

      <Box
        sx={{
          width: { xs: '100%', md: '48%', lg: '30%' },
          maxWidth: '557px',
          height: { xs: '200px', md: '300px' },
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexDirection: 'column',
          justifyContent: 'center',
          color: 'white',
          borderRadius: 2,
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <WidgetsIcon sx={{ className: "card-estoque", fontSize: 70, color: "black", position: 'relative', bottom: 7 }} />
        <Link to={"/tela-produtos "} style={{ textDecoration: 'none' }}><h3 className="atalhoP">PRODUTOS</h3></Link>
      </Box>

      <Box
        sx={{
          width: { xs: '100%', md: '48%', lg: '30%' },
          maxWidth: '557px',
          height: { xs: '200px', md: '300px' },
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexDirection: 'column',
          justifyContent: 'center',
          color: 'white',
          borderRadius: 2,
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Diversity3Icon sx={{ className: "card-estoque", fontSize: 70, color: "black", position: 'relative' }} />
        <Link to={"/tela-solicitantes "} style={{ textDecoration: 'none' }}> <h3 className="atalhoS">SOLICITANTES</h3></Link>
      </Box>

      <Box
        sx={{
          width: { xs: '100%', md: '48%', lg: '30%' },
          maxWidth: '557px',
          height: { xs: '200px', md: '300px' },
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexDirection: 'column',
          justifyContent: 'center',
          color: 'white',
          borderRadius: 2,
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <LocalShippingIcon sx={{ className: "card-estoque", fontSize: 70, color: "black", position: 'relative', bottom: 7 }} />
         <Link to={"/tela-entradas "} style={{ textDecoration: 'none' }}><h3 className="atalhoE">ENTRADAS</h3></Link>
      </Box>
    </Box>
  );
}
