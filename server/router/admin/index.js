const express = require('express');
const router = express.Router();
const sqlite = require('../../../db/config'); // BIBLIOTECA QUE CONECTA AO SQLITE
const sqlQuery = require('../../../db/query'); // BIBLIOTECA QUE EXECULTA QUERY'S

router.get('/router/adm/test/db', async (req, res) => {

    const conn = new sqlite();
    const query = new sqlQuery();
    const db = await conn.connection();

    const command = `
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
    `;
    const params = [];

    const resultQuery = await query.execulteQuery(db, command, params);

    res.status(200).json({
        "status": "ok",
        "dataBase": resultQuery
    });

});

router.get('/router/adm/create/table/user', async (req, res) => {



});

module.exports = router;