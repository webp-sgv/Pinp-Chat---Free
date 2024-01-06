UPDATE TOP(1) table
SET column1 = 'value1'
OUTPUT
    -- OLD VALUES
    DELETED.column1 AS 'EXEMPLE-1-COLUNA-',
    REPLACE(LTRIM(RTRIM(DELETED.column1)), '  ', ' ') AS 'EXEMPLE-2-COLUNA-1',
    FORMAT(DELETED.column1, 'dd/MM/yyyy hh:mm:ss') AS 'EXEMPLE-3-COLUNA-1'
    -- NEW VALUES 
    INSERTED.column1 AS 'EXEMPLE-4-COLUNA-',
    REPLACE(LTRIM(RTRIM(INSERTED.column1)), '  ', ' ') AS 'EXEMPLE-5-COLUNA-1',
    FORMAT(INSERT.column1, 'dd/MM/yyyy hh:mm:ss') AS 'EXEMPLE-6-COLUNA-1'
FROM table
WHERE column1 = 'value1'