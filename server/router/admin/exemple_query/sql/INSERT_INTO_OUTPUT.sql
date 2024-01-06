INSERT INTO table (
    column1,
    column2
)
OUTPUT
    INSERT.column1 AS 'COLUNA-1',
    INSERT.column2 AS 'COLUNA-2'
VALUES
    ( 'value1', 'value2' ),
    ( 'value2', 'value3' ),
    ( 'value4', 'value5' )