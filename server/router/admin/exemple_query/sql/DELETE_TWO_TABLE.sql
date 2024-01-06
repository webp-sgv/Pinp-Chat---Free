-- APAGA UM REGISTRO E INSERE O
-- HISTORICO EM OUTRA TABELA
DELETE TOP(1) table1
OUTPUT
    DELETED.table1_column1,
    DELETED.table1_column2
INTO table2 ( table1_column1, table1_column2 )
WHERE table1_column1 = 1