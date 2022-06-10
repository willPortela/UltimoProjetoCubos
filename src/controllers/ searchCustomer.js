const connection = require('../database/connection');

const searchCustomer = async (req, res) => {
    const { busca } = req.body

    try {
        if (cpf !== ''){
            const queryListBilling = 'select * from customers where cpf = $1 or name = $1 or email = $1'
            const list = await connection.query(queryListBilling, [busca]);

            return res.status(201).json({ "Message": list.rows});
        }
    } catch (error) {
        return res.status(500).json({ "Message": "Erro desconhecido " + error.message })
    }
};

module.exports = {
    searchCustomer
}