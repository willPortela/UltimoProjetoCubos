const connection = require('../database/connection');

const detailCustomers = async (req, res) => {
    
    const { id } = req.params

    try {
        const listCustomers1 = 'select * from customers where id = $1'

        const list = await connection.query(listCustomers1, [id]);

        return res.status(201).json(list.rows)
    } catch (error) {
        return res.status(500).json({ "Message": "Erro desconhecido " + error.message })
    }
};

module.exports = {
    detailCustomers
}