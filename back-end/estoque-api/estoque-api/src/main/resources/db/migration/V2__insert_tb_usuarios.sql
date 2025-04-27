
INSERT INTO tb_usuarios (id, email, password, role, created_at, updated_at)
VALUES (
       uuid_generate_v4(),
       'usuario@email.com',
       '$2a$12$2i7wyGsqmcX/utBUfPKVwevETwThBDYHWl0qxKtzVMr0T47nCEmui',
       'ALMOXARIFE',
       CURRENT_TIMESTAMP,
       CURRENT_TIMESTAMP
);