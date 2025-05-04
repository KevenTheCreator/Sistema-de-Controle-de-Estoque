CREATE TABLE tb_produtos (
     id BIGSERIAL PRIMARY KEY,
     produto VARCHAR(255) NOT NULL,
     quantidade INT NOT NULL,
     fornecedor VARCHAR(255) NOT NULL,
     codigo_produto VARCHAR(255) NOT NULL,
     unidade_medida VARCHAR(255) NOT NULL,
     categoria VARCHAR(255) NOT NULL
);
