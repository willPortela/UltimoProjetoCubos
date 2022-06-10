const connection = require('../database/connection');

const listBillingForStatus2 = async (req, res) => {

    try {
        const queryListBilling = 'select * from billing where status = $1'
        const list = await connection.query(queryListBilling, [2]);

        return res.status(201).json(list.rows);
    } catch (error) {
        return res.status(500).json({ "Message": "Erro desconhecido " + error.message })
    }
};

module.exports = {
    listBillingForStatus2
}