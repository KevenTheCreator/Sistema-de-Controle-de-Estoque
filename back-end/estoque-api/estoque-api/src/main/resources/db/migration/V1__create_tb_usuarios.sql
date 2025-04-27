CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE tb_usuarios (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     email VARCHAR(255) NOT NULL,
     password VARCHAR(255) NOT NULL,
     role VARCHAR(50) NOT NULL,
     created_at TIMESTAMP NOT NULL,
     updated_at TIMESTAMP
);
