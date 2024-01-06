-- ATUALIZA UM REGISTRO E SALVA
-- EM OUTRA TABELA AO MESMO TEMPO
UPDATE TOP(1) table1
SET
    table1_column1 = 'newValue',
    table1_column2 = 'newValue'
OUTPUT
    -- NEW VALUE
    DELETED.table1_column1,
    DELETED.table1_column2
INTO table2 (
    table1_column1,
    table1_column1
)
WHERE table1_column1 = 1