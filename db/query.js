// REALIZA UMA PESQUISA SIMPLES [ SELECT, DELETE, UPDATE & INSERT ]
const querySimples = async (db, query, params) => {
    const result = await db.get(query, params);
    return result;
};

module.exports = function () {
    // EXECULTA UMA QUERY SIMPLES COM QUERY E PARAMETROS
    this.execulteQuery = async (db, query, params) => {
        const data = await querySimples(db, query, params);
        return data;
    };
};