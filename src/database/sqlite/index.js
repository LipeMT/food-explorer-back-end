const sqlite3 = require('sqlite3')
const sqlite = require('sqlite')
const path = require('path')

async function sqliteConnection() {
    try {
        const database = await sqlite.open({
            filename: path.join(__dirname, '..', 'database.db'),
            driver: sqlite3.Database
        })

        return database

    } catch (error) {
        throw `Erro: Não foi possível estabelecer conexão com o banco de dados - ${error}`
    }
}
module.exports = sqliteConnection