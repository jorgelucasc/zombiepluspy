const { Pool } = require('pg')

const DbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'zombieplus',
    password: 'pwd123',
    port: 5434,
}

async function executeSQL(sqlScript){
    try {
        const pool = new Pool(DbConfig)
        const cliente = await pool.connect()

        const result = await cliente.query(sqlScript)
        console.log(result.rows)
    } catch (error) {
        console.error('Error executing SQL script:' + error)
    }
}

module.exports = { executeSQL}