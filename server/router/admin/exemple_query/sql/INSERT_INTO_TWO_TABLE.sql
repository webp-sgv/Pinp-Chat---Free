-- INSERINDO UM NOVO REGISTRO, SALVANDO
-- A SAIDA EM OUTRA TABLE TUDO NA MESMA
-- QUERY... :)
INSERT INTO table1 (
    table1_column1,
    table1_column2
)
OUTPUT
    INSERTED.table1_column1 AS 'TABELA1-COLUNA1',
    INSERTED.table1_column2 AS 'TABELA1-COLUNA2'
INTO table2 (
    'TABELA1-COLUNA1',
    'TABELA1-COLUNA2'
)
VALUES
    ( 'table1_column1 x1', 'table1_column2 x1' ),
    ( 'table1_column1 x2', 'table1_column2 x2' ),
    ( 'table1_column1 x3', 'table1_column2 x3' )