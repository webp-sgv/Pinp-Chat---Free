-- CRIA UM PROCEDSURE SIMILAR A UMA FUNCAO NO
-- SQL, PORTANTO PASSANDO ALGUNS PARAMETROS
-- PODEMOS REDUZIR O CODIGO

-- CRIA A PROCEDSURES
CREATE PROC name_procedsures (
    -- PARAMETROS
    @VAR1 VARCHAR(10),
    @VAR2 NUMERIC(5,2)
)
AS
BEGIN
    INSERT INTO table1 (
        table1_column1,
        table1_column2
    ) VALUES (
        @VAR1, @VAR2
    )
END

-- EXECULTA A PROCEDSURES
EXEC name_procedsures
    @VAR1 = 'valor1',
    @VAR2 = 'valor2'