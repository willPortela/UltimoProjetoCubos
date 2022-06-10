const connection = require('../database/connection');


const registerBilling = async (req, res) => {
    const { customers, description, amount, due, status  } = req.body;

    try {

        const queryRegisterBilling =
        'insert into billing (customers, description, amount, due, status) values ($1, $2, $3, $4, $5)';
        const { rowCount } = await connection.query(queryRegisterBilling, [customers, description, amount, due, status]);

        if (rowCount === 0) {
         
            return res.status(400).json({ "Message": "Cobrança não efetuado" });
        }

        return res.status(200).json("Cobrança cadastrado com sucesso!");

    } catch (error) {
        return res.status(500).json({ "Message": "Erro desconhecido " + error.mensagem });
    }
}

module.exports = {
    registerBilling
}