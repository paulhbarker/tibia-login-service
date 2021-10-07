const db = require('./db');
const http = require('http');
const crypto = require('crypto');
const express = require('express');
const Player = require('./player');
const config = require('./config-qa');
const Session = require('./session');
const LoginError = require('./error');


const app = express();
app.use(express.json());

app.post('/login', async (req, res) => {
    if (req.body.type === 'login') {
        try {
            const { accountname, password } = req.body;

            const account = await db.getAccount(accountname);

            if(!account) {
                const error = new LoginError('Account name or password is not correct.');
                return res.status(200).send(error.json());
            }

            const validPassword = compare(password, account.password);

            if (!validPassword) {
                const error = new LoginError('Account name or password is not correct.');
                return res.status(200).send(error.json());
            }

            const session = new Session({ account, password });

            const response = {
                session: session.json(),
                playdata: {
                    worlds: getWorlds(),
                    characters: await getPlayers(account.id),
                }
            }

            return res.status(200).send(response);
        } catch (err) {
            console.log(err);

            const error = new LoginError('A server error occurred during login. Please contact support.');
            return res.status(200).send(error.json());
        }

    }

    res.status(200).send();
});

function compare(password, hash) {
    const checksum = crypto.createHash('sha1').update(password).digest('hex');

    return checksum === hash;
}

function getWorlds() {
    const forgottenServer = {
        id: 0,
        name: config.servername,
        externaladdress: config.externaladdress,
        externalport: config.externalport,
        previewstate: 0,
        location: "ALL",
        pvptype: "pvp",
        externaladdressunprotected: config.externaladdress,
        externaladdressprotected: config.externaladdress,
        externalportunprotected: config.externalport,
        externalportprotected: config.externalport,
        istournamentworld: false,
        restrictedstore: false,
        currenttournamentphase: 2,
        anticheatprotection: false
    }

    return [forgottenServer];
}

async function getPlayers(accountId) {
    const playerData = await db.getPlayers(accountId);

    const players = playerData.map(data => {
        const player = new Player(data)
        return player.json();
    })

    return players;
}

const server = http.createServer(app);

server.listen(config.loginport, '0.0.0.0', () => {
    console.log('Listening on port ' + config.loginport);
})
