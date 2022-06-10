const connection = require('../database/connection');
const { checkUserBody } = require('../validations/validation');
const bcrypt = require('bcrypt');

const editUsers = async (req, res) => {
    const { name, email, password, phone, cpf } = req.body;

    const { userReq } = req;

    const error = checkUserBody(req.body);

    if (error) {
        return res.status(400).json({ "Message": error });
    }

    try {
        if (email !== userReq.email) {

            const queryEditUser = 'select * from users where email = $1';

            const user = await connection.query(queryEditUser, [email]);

            if (user.rowCount > 0) {
                return res.status(400).json({ "Message": "Email já cadastrado." });
            }

        }
            const queryRegUserCpf = 'select * from users where cpf = $1';

            const regUserCpf = await connection.query(queryRegUserCpf, [cpf]);
            
            if (regUserCpf.rowCount > 0 && regUserCpf.rows[0].cpf !== null && regUserCpf.rows[0].cpf !== '' ) {
                return res.status(400).json({ "Message": "Cpf já cadastrado." });
            }

        const cryptAccessPass = await bcrypt.hash(password, 10);

        const editLoggedUser = 'update users set name = $1, email = $2, password = $3, phone = $4,cpf =$5  where id = $6'

        const { rowCount } = await connection.query(editLoggedUser, [name, email, cryptAccessPass, phone, cpf, userReq.id]);

        if (rowCount === 0) {
            return res.status(500).json({ "Message": "Cadastro não alterado" })
        }

        return res.status(204).json();

    } catch (error) {
        return res.status(500).json({ "Mensagem": "Erro desconhecido " + error.mensagem })
    }
};

module.exports = {
    editUsers
}