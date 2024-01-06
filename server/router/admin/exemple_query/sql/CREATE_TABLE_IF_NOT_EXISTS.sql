-- CRIA UMA TABELA SE A MESMA NÃO EXISTIR
IF NOT EXISTS (
    SELECT TOP(1) * FROM table;
)
CREATE TABLE table (
    column1 int(11) NOT NULL AUTO_INCREMENT,
    column2 varchar(255),
    column3 char(10),
    column4 date,
    column5 datetime DEFAULT GETDATE(),
    column6 number(1),
    column7 varchar(255) DEFAULT 'NOT NULL'
)
GO