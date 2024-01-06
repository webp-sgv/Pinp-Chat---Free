const express = require('express');
const router = express.Router();
const sqlite = require('../../../db/config'); // BIBLIOTECA QUE CONECTA AO SQLITE
const sqlQuery = require('../../../db/query'); // BIBLIOTECA QUE EXECULTA QUERY'S

router.get('/router/adm/test/db', async (req, res) => {

    const conn = new sqlite();
    const query = new sqlQuery();
    const db = await conn.connection();

    const command = `
        SELECT * FROM usuarios;
    `;
    const params = [1];

    const resultQuery = await query.execulteQuery(db, command, params);

    res.status(200).json({
        "status": "ok",
        "dataBase": resultQuery
    });

});

router.get('/router/adm/create/table/user', async (req, res) => {

    const conn = new sqlite();
    const query = new sqlQuery();
    const db = await conn.connection();

    const command = `
        CREATE TABLE IF NOT EXISTS usuarios (
            id integer PRIMARY KEY AUTOINCREMENT,
            nome varchar(50) NOT NULL,
            email varchar(100) NOT NULL UNIQUE,
            senha char(72),
            ativo integer NOT NULL DEFAULT 1,
            resetar_senha integer NOT NULL DEFAULT 0,
            criado datetime NOT NULL DEFAULT GETDATE
        );
    `;
    const params = [];

    const resultQuery = await query.execulteQuery(db, command, params);

    res.status(200).json({
        "status": "ok",
        "fx-human": "Cria a tabela usuario caso nao exista",
        "fx": "create_table_user_if_not_exist",
        "fx-response": resultQuery
    });

});

module.exports = router;