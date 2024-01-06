IF NOT EXISTS (
    SELECT * FROM column1;
)
BEGIN
    INSERT INTO table (
        column1,
        column2
    ) VALUES (
        'column1',
        'column2'
    )
END
ELSE
BEGIN
    UPDATE table
    SET column1 = 'value1'
    column2 = 'value2'
END