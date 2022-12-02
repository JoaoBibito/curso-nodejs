DROP TABLE IF EXISTS TB_HEROIS;
CREATE TABLE TB_HEROIS(
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NOME TEXT NOT NULL, 
    PODER TEXT NOT NULL
)

--create 
INSERT INTO TB_HEROIS (NOME,PODER)
VALUES ('Flash', 'Velocidade')
        ('Aquaman','Falar com animais aquaticos')
        ('Batman', 'Dinheiro')

--read
SELECT * FROM TB_HEROIS;
SELECT * FROM TB_HEROIS WHERE NOME ="Flash";

--update
UPDATE TB_HEROIS   
SET NOME = 'Goku', PODER='Deus'
WHERE ID=1;