import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import './tela-relatorios.css';

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: (theme.vars || theme).palette.background.paper,
}));

const relatorios = [
  { text: 'Relatório de Produtos', path: '/relatorios/produtos' },
  { text: 'Relatório de Solicitantes', path: '/relatorios/solicitantes' },
  { text: 'Relatório de Entradas', path: '/relatorios/entradas' },
  { text: 'Relatório de Saídas', path: '/relatorios/saidas' },
  { text: 'Relatório de Saldos em Estoque', path: '/relatorios/saldos' },
  { text: 'Relatório de Produtos com Maior Circulação', path: '/relatorios/maior-circulacao' },
  { text: 'Relatório de Produtos Sem Movimentação', path: '/relatorios/sem-movimentacao' },
  { text: 'Relatório de Produtos Abaixo do Estoque Mínimo', path: '/relatorios/abaixo-minimo' },
];

export default function TelaRelatorios() {
    return (
        <Box
          className="relatorios-box"
          sx={{
            width: '90%',
            height: '80vh',
            minHeight: 400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
          }}
        >
            <Grid
                container
                spacing={2}
                justifyContent="center"
                alignItems="center"
                sx={{ height: '100%', width: '100%' }}
            >
                <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        height: '87%',

                    }}
                >
                    <Demo sx={{ width: '100%', borderRadius: '8px', boxShadow: 2, }}>
                        <List>
                            <Typography sx={{ display: 'flex', mt: 2, mb: 2, ml: 3, mr: 2,fontFamily: 'Montserrat, Arial, sans-serif', fontWeight: 700}} variant="h6" component="div">
                                RELATÓRIOS
                            </Typography>
                            <hr color='#e0e0e0'/>
                            {relatorios.map((rel, idx) => (
                                <ListItem key={idx} sx={{ marginTop: 2 }}>
                                    <ListItemIcon>
                                        <InsertDriveFileIcon sx={{ fontSize: 50, color: 'black' }} />
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Link
                                                to={rel.path}
                                                style={{
                                                    textDecoration: 'none',
                                                    color: 'rgb(94, 94, 94)',
                                                    fontFamily: 'Montserrat, Arial, sans-serif',
                                                    fontWeight: 600,
                                                    fontSize: 20,
                                                    cursor: 'pointer',
                                                    transition: 'color 0.2s',
                                                }}
                                                onMouseOver={e => (e.currentTarget.style.color = 'black')}
                                                onMouseOut={e => (e.currentTarget.style.color = 'rgb(94, 94, 94)')}
                                            >
                                                {rel.text}
                                            </Link>
                                        }
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Demo>
                </Grid>
            </Grid>
        </Box>
    );
}
