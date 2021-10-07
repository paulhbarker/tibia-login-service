const mysql = require('mysql');

const pool = mysql.createPool({
    host: '127.0.0.1',
    database: 'ots',
    user: 'dbuser',
    password: 'password'
});

async function getAccount(accountname) {
    const connection = await getConnection();

    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM accounts WHERE `name` = ?', accountname, (err, results) => {
            connection.release();

            if (err) reject(err);

            if (results) {
                resolve(results[0]);
            }

            resolve(null);
        })
    })
}

async function getPlayers(accountId) {
    const connection = await getConnection();

    const columns = ['name', 'level', 'sex', 'vocation', 'looktype', 'lookhead', 'lookbody', 'looklegs', 'lookfeet', 'lookaddons', 'deletion', 'lastlogin'];

    return new Promise((resolve, reject) => {
        connection.query(`SELECT ${columns.join(',')} FROM players WHERE \`account_id\` = ?`, accountId, (err, results) => {
            connection.release();

            if (err) reject(err);
            resolve(results);
        })
    })
}

function getConnection() {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) reject(err);

            resolve(connection);
        })
    });
}

module.exports = {
    getAccount,
    getPlayers
}

