;             
CREATE USER IF NOT EXISTS "SA" SALT 'bf9f3f591b9ada00' HASH 'a46f2793ba2e111346174d4e31ef0ef539cad89ff39b3a71039e288f941d876d' ADMIN;         
CREATE SEQUENCE "PUBLIC"."HIBERNATE_SEQUENCE" START WITH 1387;
CREATE CACHED TABLE "PUBLIC"."CARRINHO"(
    "GUID_CARRINHO" INTEGER NOT NULL,
    "PRECO_BEAT" VARCHAR(255),
    "BEAT_GUID_BEAT" INTEGER,
    "USUARIO_GUID_USUARIO" INTEGER
);        
ALTER TABLE "PUBLIC"."CARRINHO" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_2E" PRIMARY KEY("GUID_CARRINHO");         
-- 16 +/- SELECT COUNT(*) FROM PUBLIC.CARRINHO;               
INSERT INTO "PUBLIC"."CARRINHO" VALUES
(642, '15', 164, 1),
(643, '20', 169, 1),
(644, '20', 166, 1),
(645, '30', 163, 1),
(646, '15', 167, 1),
(675, '20', 164, 674),
(676, '15', 169, 674),
(678, '50', 677, 1),
(679, '20', 168, 1),
(711, '15', 170, 1),
(778, '12', 777, 1),
(967, '24', 937, 1),
(1000, '38', 968, 161),
(1139, '20', 1131, 1132),
(1140, '45', 1130, 1132),
(1322, '45', 1128, 1);     
CREATE CACHED TABLE "PUBLIC"."DESCONTOS"(
    "GUID_DESCONTO" INTEGER NOT NULL,
    "NOME" VARCHAR(255),
    "PORCENTAGEM" VARCHAR(255)
);
ALTER TABLE "PUBLIC"."DESCONTOS" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_F" PRIMARY KEY("GUID_DESCONTO");         
-- 0 +/- SELECT COUNT(*) FROM PUBLIC.DESCONTOS;               
CREATE CACHED TABLE "PUBLIC"."ORDER_PRODUCT"(
    "QUANTITY" INTEGER NOT NULL,
    "GUID_BEAT" INTEGER NOT NULL,
    "GUID_PEDIDO" BIGINT NOT NULL
);     
ALTER TABLE "PUBLIC"."ORDER_PRODUCT" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_9" PRIMARY KEY("GUID_BEAT", "GUID_PEDIDO");          
-- 0 +/- SELECT COUNT(*) FROM PUBLIC.ORDER_PRODUCT;           
CREATE CACHED TABLE "PUBLIC"."FAVORITOS"(
    "GUID_CARRINHO" INTEGER NOT NULL,
    "BEAT_GUID_BEAT" INTEGER,
    "USUARIO_GUID_USUARIO" INTEGER
);       
ALTER TABLE "PUBLIC"."FAVORITOS" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_3B" PRIMARY KEY("GUID_CARRINHO");        
-- 9 +/- SELECT COUNT(*) FROM PUBLIC.FAVORITOS;               
INSERT INTO "PUBLIC"."FAVORITOS" VALUES
(1069, 166, 1),
(1070, 937, 1),
(1071, 937, 161),
(1072, 938, 1),
(1073, 968, 1),
(1134, 1131, 1132),
(1135, 1130, 1132),
(1137, 1128, 1132),
(1289, 163, 1288);             
CREATE CACHED TABLE "PUBLIC"."PEDIDO"(
    "GUID_PEDIDO" BIGINT NOT NULL,
    "DATA" DATE,
    "STATUS" VARCHAR(255)
);   
ALTER TABLE "PUBLIC"."PEDIDO" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_8" PRIMARY KEY("GUID_PEDIDO");              
-- 0 +/- SELECT COUNT(*) FROM PUBLIC.PEDIDO;  
CREATE CACHED TABLE "PUBLIC"."BEATS"(
    "GUID_BEAT" INTEGER NOT NULL,
    "BPM" VARCHAR(255),
    "DATA_LANCAMENTO" TIMESTAMP,
    "IMAGEM" VARCHAR(255),
    "NOTA" VARCHAR(255),
    "PRECO_BASIC" VARCHAR(255),
    "PRECO_PREMIUM" VARCHAR(255),
    "PRECO_UNLIMITED" VARCHAR(255),
    "STEMS" VARCHAR(255),
    "TAGS" VARCHAR(255),
    "TITULO" VARCHAR(255),
    "WAV_TAGGED" VARCHAR(255),
    "WAV_UNTAGGED" VARCHAR(255),
    "SELECTED" INTEGER,
    "USUARIO_GUID_USUARIO" INTEGER,
    "DISCOUNT" FLOAT
); 
ALTER TABLE "PUBLIC"."BEATS" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_3" PRIMARY KEY("GUID_BEAT"); 
-- 31 +/- SELECT COUNT(*) FROM PUBLIC.BEATS;  
INSERT INTO "PUBLIC"."BEATS" VALUES
(163, '85', TIMESTAMP '2022-11-24 11:57:00', 'beat2.png', 'A#m', '15', '20', '30', 'stems test.rar', NULL, 'Aura | Vhulto Type Beat', 'mix2.wav', 'mix2.wav', NULL, 1, NULL),
(164, '120', TIMESTAMP '2022-11-24 11:59:00', 'beat1.png', 'Am', '15', '20', '30', 'stems test.rar', NULL, 'Spotlight | Lil Peep x Smokeasac Type Beat', 'mix2.wav', 'mix2.wav', NULL, 1, NULL),
(166, '140', TIMESTAMP '2022-11-24 12:14:00', 'beat4.png', 'Dm', '15', '20', '30', 'stems test.rar', NULL, '1984 | Glaive x Ericdoa Type Beat', 'mix2.wav', 'mix2.wav', NULL, 1, NULL),
(167, '130', TIMESTAMP '2022-11-24 12:15:00', 'beat5.png', 'Bm', '15', '20', '30', 'stems test.rar', NULL, 'Road | Plugg Type Beat', 'mix2.wav', 'mix2.wav', NULL, NULL, NULL),
(168, '160', TIMESTAMP '2022-11-24 12:16:00', 'beat6.png', 'Cm', '15', '20', '30', 'stems test.rar', NULL, 'Lucid | Juice Wrld x Nick Mira Type Beat', 'mix2.wav', 'mix2.wav', NULL, NULL, NULL),
(169, '105', TIMESTAMP '2022-11-24 12:17:00', 'beat7.png', 'Em', '15', '20', '30', 'stems test.rar', NULL, 'Antes | Ferno x Matue Type Beat', 'mix2.wav', 'mix2.wav', NULL, NULL, NULL),
(170, '120', TIMESTAMP '2022-11-24 12:18:00', 'beat8.png', 'F#m', '15', '20', '30', 'stems test.rar', NULL, 'Kyushu | Japa Type Beat', 'mix2.wav', 'mix2.wav', NULL, NULL, NULL),
(195, '155', TIMESTAMP '2022-11-25 16:45:00', 'beat12.png', 'C#m', '15', '20', '30', 'stems test.rar', NULL, 'Titulo tesdte', 'mix2.wav', 'mix2.wav', NULL, NULL, NULL),
(226, '150', TIMESTAMP '2022-12-23 23:13:00', 'beat11.png', 'Am', '27', '35', '50', 'stems test.rar', NULL, 'beat18', 'mix2.wav', 'mix2 (1).wav', NULL, NULL, NULL),
(356, '130', TIMESTAMP '2023-05-20 17:54:00', 'beat6.png', 'C#', '15', '20', '30', 'empty.rar', NULL, 'TESTE22', 'mix2 (4).wav', 'mix2 (4).wav', NULL, NULL, NULL),
(677, '155', NULL, 'palm1.gif', 'C major', '25', '50', '80', 'FLARE-1818-WIN.rar', NULL, 'TituloTESTE', '80s_2.wav', '80s_2.wav', NULL, NULL, NULL),
(743, '150', NULL, 'beat1.png', 'A minor', '12', '20', '50', 'empty (3).zip', NULL, 'aaaaaaa', 'mix2 (7).wav', 'mix2 (9).wav', NULL, NULL, NULL),
(776, '98', NULL, 'beat2.png', 'F minor', '12', '24', '30', 'empty (3).zip', NULL, 'exemplo1', 'mix2 (8).wav', 'mix2 (9).wav', NULL, NULL, NULL),
(777, '160', NULL, 'beat5.png', 'A minor', '12', '24', '35', 'empty (3).zip', NULL, 'exemplo2', 'mix2 (8).wav', 'E5.pdf', NULL, NULL, NULL),
(807, '150', NULL, 'beat3.png', 'A minor', '12', '25', '50', 'empty (1).rar', NULL, 'exemplo4', 'mix2 (8).wav', 'mix2 (8).wav', NULL, NULL, NULL),
(808, '150', NULL, 'beat7.png', 'A minor', '15', '20', '30', 'empty (1).rar', NULL, 'exemplo5', 'mix2 (8).wav', 'mix2 (8).wav', NULL, NULL, NULL),
(809, '150', NULL, 'beat2.png', 'G minor', '15', '20', '30', 'empty (1).rar', NULL, 'titulo josi', 'mix2 (8).wav', 'mix2 (8).wav', NULL, NULL, NULL),
(839, '150', NULL, 'beat5.png', 'A minor', '12', '24', '36', 'empty.rar', NULL, 'testeee', 'mix2 (9).wav', 'mix2 (9).wav', NULL, NULL, NULL),
(903, '150', NULL, 'beat7.png', 'B minor', '12', '24', '36', 'empty.rar', NULL, 'user1', 'mix2 (9).wav', 'mix2 (8).wav', NULL, NULL, NULL),
(935, '120', NULL, 'beat8.png', 'F minor', '12', '24', '26', 'empty (1).rar', NULL, 'user2', 'mix2 (9).wav', 'mix2 (9).wav', NULL, NULL, NULL),
(936, '150', NULL, 'beat5.png', 'B minor', '15', '30', '35', 'empty (1).rar', NULL, 'user3', 'mix2 (9).wav', 'mix2 (8).wav', NULL, NULL, NULL),
(937, '120', NULL, 'beat6.png', 'G minor', '12', '24', '36', 'empty (1).rar', NULL, 'user4', 'mix2 (8).wav', 'mix2 (8).wav', NULL, 1, NULL),
(938, '120', NULL, 'beat4.png', 'G minor', '12', '24', '36', 'empty (3).zip', NULL, 'user5', 'mix2 (8).wav', 'mix2 (9).wav', NULL, 1, NULL),
(939, '150', NULL, 'beat2.png', 'G minor', '12', '24', '36', 'empty.rar', NULL, 'user6', 'mix2 (9).wav', 'mix2 (8).wav', NULL, 1, NULL),
(968, '124', NULL, 'beat8.png', 'B minor', '14', '28', '38', 'empty (1).rar', NULL, 'testeUser5', 'mix2 (9).wav', 'mix2 (9).wav', NULL, 161, NULL),
(1128, '120', NULL, 'beat14.png', 'A minor', '20', '25', '45', 'empty.rar', NULL, 'Vanish | Ramzoid x Hyperpop Dark Type Beat', 'Vanish_tagged.wav', 'Vanish_tagged.wav', NULL, 1, NULL);              
INSERT INTO "PUBLIC"."BEATS" VALUES
(1129, '115', NULL, 'beat13.png', 'G minor', '20', '25', '45', 'empty.rar', NULL, 'Evergreen | Lil Peep Type Beat', 'Evergreen_tagged.wav', 'Evergreen_tagged.wav', NULL, 1, NULL),
(1130, '160', NULL, 'beat15.png', 'G minor', '20', '25', '45', 'empty.rar', NULL, 'Cybernetic | Rage x Trippie Redd x Yeat Type Beat', 'Cybernetic_tagged.wav', 'Cybernetic_tagged.wav', NULL, 1, NULL),
(1131, '155', NULL, 'beat3.png', 'G# minor', '15', '20', '30', 'empty.rar', NULL, 'June | Nick Mira x Juice Wrld Type Beat', 'June_tagged.wav', 'June_tagged.wav', NULL, 1, NULL),
(1138, '150', NULL, 'beat2.png', 'B minor', '12', '24', '36', 'empty.rar', NULL, 'testeA', 'E5.docx', 'E5.pdf', NULL, 1132, NULL),
(1290, '112', TIMESTAMP '2024-06-27 07:00:00', 'beat14.png', 'A minor', '12', '24', '26', 'empty.rar', NULL, 'testeApr', 'mix2 (8).wav', 'mix2 (8).wav', NULL, 1, NULL);          
CREATE CACHED TABLE "PUBLIC"."USUARIO"(
    "GUID_USUARIO" INTEGER NOT NULL,
    "EMAIL" VARCHAR(255),
    "LOGIN" VARCHAR(255),
    "SENHA" VARCHAR(255),
    "ROLE" VARCHAR(255),
    "CARRINHO" BINARY(255),
    "IMAGEM" VARCHAR(255),
    "OTP" INTEGER,
    "CPF" VARCHAR(255),
    "NOME" VARCHAR(255),
    "SOBRE" VARCHAR(255),
    "SOBRENOME" VARCHAR(255)
);         
ALTER TABLE "PUBLIC"."USUARIO" ADD CONSTRAINT "PUBLIC"."CONSTRAINT_2" PRIMARY KEY("GUID_USUARIO");            
-- 15 +/- SELECT COUNT(*) FROM PUBLIC.USUARIO;
INSERT INTO "PUBLIC"."USUARIO" VALUES
(1, 'luissouzasanto@gmail.com', 'luigi', '$2a$10$YJ3/N8FTTl3PB0XAxLgfUeodJtfAYh3tPO4/zd4E1U2J2MRlwo/4y', 'user', NULL, 'beat2.png', 86464, '06150907962', 'Luis Felipee', 'teste.', 'Souza Santos'),
(161, 'email@email.com', 'user5', '$2a$10$4Jsfpb2J0SuUOexwpCyEieLsBYVrHrRrCdeV8qde6Rr9py1NmlnwG', 'user', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(194, 'email@email.com', 'cleverson', '$2a$10$hnBMBBOJxjK64RvZ6vIz1.JfpNfBtTefV.Iz2ISAa55RR.TLYF2vK', 'user', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(258, 'email@email.com', 'henrique', '$2a$10$HrLWRMt11nT8DbASnmtDk.i92Rsjl2i8XL3OUfwwH.ukpEk.LeQEy', 'user', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(290, 'user@email.com', 'user', '$2a$10$F6UXb8SEacfd9Rxbj2/y0.gNwTKll.8f9C16XMJuHm1NMjA/9wjg6', 'user', NULL, 'beat1.png', NULL, '0061', 'userrr', 'aaaaaa', 'u'),
(322, 'user1@email.com', 'user1', '$2a$10$AfbAv6Er7LpktrsJvyJiueMEJBmvi/6p504ef.TH4cZKuadL/Q9bK', 'user', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(354, 'cleverson@email.com', 'cleverson', '$2a$10$OR20aGRSH1qaJwkzBHgqiObXne0IelxxZ56HOjY1S3FRHMohX7spq', 'user', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(355, 'vini@email.com', 'vini', '$2a$10$QEJbV1fM3UOlpkKCOxcuoeYcd9W0VBZHdBSQwpxKcTSIfzQUSuCwe', 'user', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(674, 'user8@email.com', 'user8', '$2a$10$fl8c0cndibAymgWUJUfSYOjrPKWUTYuV/d7fhdQiIy1MgisS3OWeW', 'user', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(775, 'joselaine.valaski@gmail.com', 'josi', '$2a$10$Wdqw9XE2QejbWUHw4r15uONy9Akwjb0/LlisP1kMNI49hjtcdW3ba', 'user', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(1132, 'cleversonavelino@gmail.com', 'cleversonA', '$2a$10$.fTAxJcffuuosO.ufDq/J.zxWuZxlEwYUhmtJbV.VUQX4K.5rFTYq', NULL, NULL, 'beat13.png', NULL, '00000000000', 'aaaaa', 'teste', 'Avelino'),
(1256, 'email@email.com', 'userNovo', '$2a$10$nphdmMXnj1xHBX8lqa.HUO97bEXPelbx2KaGVh0uVQ/20fgujKhri', 'user', NULL, NULL, NULL, '06150907961', 'userNovo', NULL, 'novo'),
(1288, 'gabrieltoledoverdade@gmail.com', 'usernew2', '$2a$10$bAVEY37gRW9s8uZAlP8cb.jNG.qqFkqgCGCtb18C7/OVjQs6Jv1tG', 'user', NULL, NULL, 40276, NULL, NULL, NULL, NULL),
(1291, 'luissouzasanto@gmail.com', 'userApr', '$2a$10$l2pdS49AFh8PDSD4xhxVeOvR5c3kF7rfXtCxjnb3GXFDXLmDa8O6K', 'user', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(1354, 'usuario7@email.com', 'usuario7', '$2a$10$JixkEp53/pU9bqo1wp19je0s/o/gs5VCl71Splrb/K3DrBE8MfaHG', 'user', NULL, NULL, NULL, NULL, NULL, NULL, NULL);  
ALTER TABLE "PUBLIC"."ORDER_PRODUCT" ADD CONSTRAINT "PUBLIC"."FKJ1AKJWWG0JYKFJPVXJ1TUJWCV" FOREIGN KEY("GUID_BEAT") REFERENCES "PUBLIC"."BEATS"("GUID_BEAT") NOCHECK;         
ALTER TABLE "PUBLIC"."ORDER_PRODUCT" ADD CONSTRAINT "PUBLIC"."FKIHC3K5TA9F9H0UD4C18D0WPAK" FOREIGN KEY("GUID_PEDIDO") REFERENCES "PUBLIC"."PEDIDO"("GUID_PEDIDO") NOCHECK;    
ALTER TABLE "PUBLIC"."FAVORITOS" ADD CONSTRAINT "PUBLIC"."FK46JS0DEC2761CYRC7MORLRHMN" FOREIGN KEY("BEAT_GUID_BEAT") REFERENCES "PUBLIC"."BEATS"("GUID_BEAT") NOCHECK;        
ALTER TABLE "PUBLIC"."CARRINHO" ADD CONSTRAINT "PUBLIC"."FKIM66RQPLTVGMKPF497NBHS84T" FOREIGN KEY("USUARIO_GUID_USUARIO") REFERENCES "PUBLIC"."USUARIO"("GUID_USUARIO") NOCHECK;              
ALTER TABLE "PUBLIC"."FAVORITOS" ADD CONSTRAINT "PUBLIC"."FK1X7NIQH74YIY80EA4A2KCOT5D" FOREIGN KEY("USUARIO_GUID_USUARIO") REFERENCES "PUBLIC"."USUARIO"("GUID_USUARIO") NOCHECK;             
ALTER TABLE "PUBLIC"."CARRINHO" ADD CONSTRAINT "PUBLIC"."FKB4KNNSJNBS9H80Y226T1U21IK" FOREIGN KEY("BEAT_GUID_BEAT") REFERENCES "PUBLIC"."BEATS"("GUID_BEAT") NOCHECK;         
ALTER TABLE "PUBLIC"."BEATS" ADD CONSTRAINT "PUBLIC"."FK8VFT64MY5NL5SNIKUGG43S5H2" FOREIGN KEY("USUARIO_GUID_USUARIO") REFERENCES "PUBLIC"."USUARIO"("GUID_USUARIO") NOCHECK; 
