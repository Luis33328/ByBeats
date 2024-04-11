--drop table usuario if exists;
--CREATE TABLE usuario (
--	email varchar(255),
--	senha varchar(255),
--	guid_usuario int primary key
--);
--
--insert into usuario (email, senha, guidusuario) values ('admin','$2a$12$EvdWfc7ntKhQDCxW/28CqeiGkXDGKQ5zhqMF7H6zlvIzEoX/Se7YO','1');
--
--CREATE SEQUENCE IF NOT EXISTS sessao MINVALUE 1 MAXVALUE 999999 INCREMENT BY 1 START WITH 1;

INSERT INTO USUARIO(GUID_USUARIO, EMAIL, LOGIN, MATRICULA, PERFIL, SENHA, STATUS)
VALUES(1, 'admin', 'admin', '777', null, '$2a$12$EvdWfc7ntKhQDCxW/28CqeiGkXDGKQ5zhqMF7H6zlvIzEoX/Se7YO', 'ATIVO');