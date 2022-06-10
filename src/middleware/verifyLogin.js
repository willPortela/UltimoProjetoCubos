const connection = require('../database/connection');
const jwt = require('jsonwebtoken');
const secret = require('../passphrase');

const verifyLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization){
        return res.status(401).json({ "Message": "O usuario precisa estar logado e com um token valido." });
    }

    try {
        const token = authorization.replace("Bearer ", "");

        const { id } = jwt.verify(token, secret);

        const query = 'select * from users where id = $1'

        const { rowCount, rows } = await connection.query(query, [id])

        if (rowCount === 0) {
            return res.status(404).json({"Message": "Usuario não encontrado."});
        }

        const { senha:_, ...userReq } = rows[0];

        req.userReq = userReq;

        next();
        
    } catch (error) {
        return res.status(500).json({ "Message": "Erro desconhecido " + error.mensagem });
    }
}

module.exports = verifyLogin;