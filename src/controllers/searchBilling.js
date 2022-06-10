const connection = require('../database/connection');

const searchBilling = async (req, res) => {
    const { name } = req.body

    try {
        const queryClient = 'select * from customers where name = $1'
        const client = await connection.query(queryClient, [name]);

        const idClient = client.rows[0].id;

        const querySearchBilling = 'select * from billing where customers = $1'
        const list = await connection.query(querySearchBilling, [idClient]);

        return res.status(201).json({ "Message": list.rows });
        
    } catch (error) {
        return res.status(500).json({ "Message": "Erro desconhecido " + error.message })
    }
};

module.exports = {
    searchBilling
}