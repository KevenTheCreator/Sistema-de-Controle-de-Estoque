import React from "react";
import "./tela-inicial.css";

const Telainicial = () => {
  return (
    <div className="Home">
         {/*Header*/}
      <header className="header">
        <div className="div-logo">
          <img className="logo-header" src="/logo-principal.png" alt="" />
        </div>
        <nav className="navbar">
          <ul className="navlist">
            <li >
              <img src="/inicio-icon.png" className="icones" alt="" />
              <a href="#">Inicio</a>
            </li>
            <li>
            <img src="/box-icon.png" className="icones" alt="" />
              <a href="#">Produtos</a>
            </li>
            <li>
            <img src="/people-icon.png" className="icones" alt="" />
              <a href="#">Solicitantes</a>
            </li>
            <li>
            <img src="/shipped-icon.png" className="icones" alt="" />
              <a href="#">Entradas</a>
            </li>
            <li>
            <img src="/shopping-cart-icon.png" className="icones" alt="" />
              <a href="#">Saídas</a>
            </li>
            <li>
            <img src="/pdf-icon.png" className="icones" alt="" />
              <a href="#">Relatórios</a>
            </li>
          </ul>
        </nav>
        <img src="user-icon.png" alt="" className="user-logo"/>
      </header>

       {/*Sessão para inicio*/}
      <section className="container-inicial">
        <div className="s1">
          <div className="bar">
            <h3 className="h3P">PRODUTOS COM<br/> ESTOQUE BAIXO <br /></h3>
            <img src="/warning-icon.png" className="icone-inicio" id="icon1" alt=""/>
            <h3  id="zero1">0</h3>
          </div>
        </div>
        <div className="s2">
          <div className="bar">
            <h3 className="h3Q">QUANTIDADE DE <br />PRODUTOS NO <br />ESTOQUE</h3>
          <img src="/warning-icon.png" className="icone-inicio" id="icon2" alt=""/>
          <h3  id="zero2">0</h3>
          </div>
        </div>
        <div className="s3">
          <div className="bar">
          <h3 className="h3C">CUSTO TOTAL DE <br />PRODUTOS</h3>
          <img src="/warning-icon.png" className="icone-inicio" id="icon3" alt=""/>
          <h3  id="zero3">0</h3>
          </div>
        </div>
      </section>
      
      <h1 className="atalho">ATALHOS</h1>

      {/*Sessão para atalhos no inicio*/}
      <section className="container-atalhos">
        <div className="a1">
          <div className="ata">
          <img src="/boxes-icon.png" className="icone" alt="" id="boxes-icon"/>
          <h2>PRODUTOS</h2>
          </div>
        </div>
        <div className="a2">
          <div className="ata">
            <img src="/people-icon.png" className="icone" alt=""/>
            <h2>SOLICITANTES</h2>
          </div>
        </div>
        <div className="a3">
          <div className="ata">
          <img src="/shipped-icon.png" className="icone" alt="" />
          <h2>ENTRADA</h2>
          </div>
        </div>
      </section>

      <footer>
        
      </footer>
    </div>
  );
};

export default Telainicial;
