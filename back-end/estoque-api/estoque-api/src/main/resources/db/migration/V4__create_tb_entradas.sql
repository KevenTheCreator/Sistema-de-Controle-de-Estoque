CREATE TABLE tb_entradas (
     id BIGSERIAL PRIMARY KEY,
     produto VARCHAR(255) NOT NULL,
     quantidade_recebida INT NOT NULL,
     fornecedor VARCHAR(255) NOT NULL,
     data_de_entrada DATE NOT NULL,
     nota_fiscal VARCHAR(255) NOT NULL,
     preco_unitario DOUBLE PRECISION NOT NULL,
     valor_total DOUBLE PRECISION NOT NULL,
     responsavel VARCHAR(255) NOT NULL
);