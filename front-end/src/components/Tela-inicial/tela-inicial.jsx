import React from "react";
import "./tela-inicial.css";

const Telainicial = () => {
  return (
    <div className="Home">
      <header className="header">
        <img className="logo-header" src="/logo-principal.png" alt="" />
        <nav className="navbar">
          <ul className="navlist">
            <li>
              <a href="#">Inicio</a>
            </li>
            <li>
              <a href="#">Produtos</a>
            </li>
            <li>
              <a href="#">Solicitantes</a>
            </li>
            <li>
              <a href="#">Entradas</a>
            </li>
            <li>
              <a href="#">Saídas</a>
            </li>
            <li>
              <a href="#">Relatórios</a>
            </li>
          </ul>
        </nav>
      </header>
      <section className="container-inicial">
        <div className="s1">
          <div className="bar"></div>
        </div>
        <div className="s2">
          <div className="bar"></div>
        </div>
        <div className="s3">
          <div className="bar"></div>
        </div>
      </section>
      <div className="sidebar"></div>
    </div>
  );
};

export default Telainicial;
