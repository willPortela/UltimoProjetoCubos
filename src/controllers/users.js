const connection = require('../database/connection');
const { checkUserBody } = require('../validations/validation.js');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    const error = checkUserBody(req.body);
    
    if (error) {
        return res.status(400).json({ "Message": error });
    }

    try {
        const queryUser = 'select * from users where email = $1';
        
        const user = await connection.query(queryUser, [email]);
        
        if (user.rowCount > 0) {
            return res.status(400).json({ "Message": "Email já cadastrado." });
        }

        const cryptAccessPass = await bcrypt.hash(password, 10);
        
        const saveUser = 'insert into users(name, email, password) values($1, $2, $3)'

        const { rowCount } = await connection.query(saveUser, [name, email, cryptAccessPass]);
        
        if (rowCount === 0) {
            return res.status(500).json({ "Message": "Cadastro não efetuado" });
        }
        return res.status(201).json({"Message": "Usuário Cadastrado com Sucesso."});

    } catch (error) {
        return res.status(500).json({ "Message": "Erro desconhecido " + error.mensagem });
    }
};

module.exports = {
    registerUser,
}