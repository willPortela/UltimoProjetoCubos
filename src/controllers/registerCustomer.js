const connection = require('../database/connection');
const { checkUserBodyNoPassword } = require('../validations/validation.js');
const { cpf } = require ('cpf-cnpj-validator')

const registerCustomer = async (req, res) => {
    const { name, email, phone, street, number, sector, city, state, cpfNumber, zipcode, complement } = req.body;
    console.log(req.body);
    const error = checkUserBodyNoPassword(req.body);

    if (error) {
        return res.status(400).json({ "Message": error })
    }

    try {
        const queryRegCustomer = 'select * from customers where email = $1';

        const regCustomer = await connection.query(queryRegCustomer, [email]);
        
        if (regCustomer.rowCount > 0) {

            return res.status(400).json({ "Message": "Email já cadastrado." });
        }

        const cpfReal = cpf.isValid(cpfNumber);
        if (cpfReal === true){
            const queryRegCustomerCpf = 'select * from customers where cpf = $1';

            const regCustomerCpf = await connection.query(queryRegCustomerCpf, [cpf]);
            
            if (regCustomerCpf.rowCount > 0) {
                return res.status(400).json({ "Message": "Cpf já cadastrado." });
            }
                
        }else {
            return res.status(400).json({ "Message": "Cpf Inválido." }); 
        }

        const queryRegisterCustomer =
        'insert into customers (name, email, phone, street, number, sector, city, state, cpf, zipcode, status, complement) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)';
        const { rowCount } = await connection.query(queryRegisterCustomer, [name, email, phone, street, number, sector, city, state, cpfNumber, zipcode, 1,complement]);

        if (rowCount === 0) {
            return res.status(400).json({ "Message": "Cadastro não efetuado" });
        }

        return res.status(200).json("Cliente cadastrado com sucesso!");

    } catch (error) {
        return res.status(500).json({ "Message": "Erro desconhecido " + error.mensagem });
    }
}

module.exports = {
    registerCustomer
}