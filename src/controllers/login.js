const connection = require('../database/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../passphrase');

const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ "Message": "Campo Obrigatório Não Informado." })
    }

    try {

        const queryLogin = 'select * from users where email = $1';

        const { rowCount, rows } = await connection.query(queryLogin, [email]);

        const searchUser = rows[0];

        if (rowCount === 0) {
            return res.status(400).json({ "Message": "Email ou senha invalido." })
        }

        const checkPassPhrase = await bcrypt.compare(password, searchUser.password);

        if (!checkPassPhrase) {
            return res.status(400).json({ "Message": "Email ou Senha incorreta." })
        }

        const token = await jwt.sign({ id: searchUser.id }, secret, { expiresIn: '1h' });
        const { password:_, ...user } = searchUser;

        return res.status(200).json({"Message": token, user});
        
    } catch (error) {
        return res.status(500).json({ "Message": "Erro desconhecido " + error.mensage })
    }
}

module.exports = handleLogin;