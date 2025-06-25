CREATE TABLE tb_saidas (
    id BIGSERIAL PRIMARY KEY,
    produto VARCHAR(255) NOT NULL,
    quantidade_retirada INT NOT NULL,
    data_saida DATE NOT NULL,
    data_devolucao DATE,
    nome_solicitante VARCHAR(255) NOT NULL,
    tipo_solicitante VARCHAR(255) NOT NULL,
    destino VARCHAR(255) NOT NULL,
    status VARCHAR(255)
);