const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

// REALIZA UMA PESQUISA SIMPLES [ SELECT, DELETE, UPDATE & INSERT ]
const querySimples = async (db, query, params) => {
    
    var newObj = [];

    await db.each(query, params, (err, row) => {
        newObj.push(row);
    });

    db.close();
    return newObj;
};

module.exports = function () {
    // EXECULTA UMA QUERY SIMPLES COM QUERY E PARAMETROS
    this.execulteQuery = async (db, query, params) => {
        const data = await querySimples(db, query, params);
        return data;
    };
};