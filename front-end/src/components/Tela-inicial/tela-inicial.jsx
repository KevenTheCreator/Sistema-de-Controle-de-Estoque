import React from "react";
import "./tela-inicial.css";
import WarningIcon from '@mui/icons-material/Warning';
import WidgetsIcon from '@mui/icons-material/Widgets';
import Diversity3Icon from '@mui/icons-material/Diversity3Outlined';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AssignmentIcon from '@mui/icons-material/Assignment';

const Telainicial = () => {
  return (
    <div className="Home">
    
       {/*Sessão para inicio*/}
      <section className="container-inicial">
        <div className="s1">
          <div className="card-estoque">
          <WarningIcon sx={{ fontSize: 70, color: "red",position:'relative'}} />
            <h3 className="cardP">PRODUTOS COM  ESTOQUE BAIXO </h3>
            <h3>0</h3>
          </div>
        </div>
        <div className="s2">
          <div className="card-estoque">
          <AssignmentIcon sx={{ fontSize: 70, color: "green", position:'relative'}} />
            <h3 className="cardQ">QUANTIDADE DE PRODUTOS NO ESTOQUE</h3>
          <h3>0</h3>
          </div>
        </div>
        <div className="s3">
          <div className="card-estoque">
          <AttachMoneyIcon sx={{ fontSize: 70, color: "blue", position:'relative'}} />
          <h3 className="cardC">CUSTO TOTAL DE PRODUTOS DO ESTOQUE</h3>
          <h3>0</h3>
          </div>
        </div>
      </section>
      
      {/*Sessão para atalhos*/}
      <section className="container-atalho">
      <h1 id="atalho">ATALHOS</h1>
      
      <div className="div-atalho">
        <div className="a1">
          <div className="card-atalho">
          <WidgetsIcon sx={{ fontSize: 70, color: "black", position:'relative', bottom: 7}} />
            <h3 className="atalhoP">PRODUTOS </h3>
          </div>
        </div>
        <div className="a2">
          <div className="card-atalho">
          <Diversity3Icon sx={{ fontSize: 70, color: "black", position:'relative'}} />
            <h3 className="atalhoS">SOLICITANTES</h3>
          </div>
        </div>
        <div className="a3">
          <div className="card-atalho">
          <LocalShippingIcon sx={{ fontSize: 70, color: "black", position:'relative', bottom: 7}} />
          <h3 className="atalhoE">ENTRADAS</h3>
          </div>
        </div>
        </div>
      </section>
    </div>
  );
};

export default Telainicial;
