const express = require('express');
const router = express.Router();
const sqlite = require('../../../db/config'); // BIBLIOTECA QUE CONECTA AO SQLITE
const sqlQuery = require('../../../db/query'); // BIBLIOTECA QUE EXECULTA QUERY'S

router.get('/router/adm/test/db', async (req, res) => {

    const conn = new sqlite();
    const query = new sqlQuery();
    const db = await conn.connection();

    const command = `
        SELECT * FROM message;
    `;
    const params = [];

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
            criado text NOT NULL DEFAULT CURRENT_TIMESTAMP
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

router.get('/router/adm/create/table/message', async (req, res) => {

    const conn = new sqlite();
    const query = new sqlQuery();
    const db = await conn.connection();

    const command = `
        CREATE TABLE IF NOT EXISTS message (
            id integer PRIMARY KEY AUTOINCREMENT,
            author varchar(50) NOT NULL,
            type varchar(10),
            msg text NOT NULL,
            room varchar(100),
            avatar varchar(100) NOT NULL DEFAULT 'img/avatar/default.jpg',
            t datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `;
    const params = [];

    const resultQuery = await query.execulteQuery(db, command, params);

    res.status(200).json({
        "status": "ok",
        "fx-human": "Cria a tabela message caso nao exista",
        "fx": "create_table_message_if_not_exist",
        "fx-response": resultQuery
    });

});

module.exports = router;