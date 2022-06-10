const connection = require('../database/connection');
const { format } = require('date-fns');

const deleteBilling = async (req, res) => {
    const { id } = req.params

    try {

        const dataAtual = new Date();
        const dataBR = format(new Date(dataAtual), 'MM/dd/yyyy');

        const queryBillingData = 'select from billing where id = $1'

        const billing = await connection.query(queryBillingData, [id]);

        if(billing.rows[0].status === 2 || billing.rows[0].status === 1 && billing.rows[0].due <= dataBR){
            const queryDeleteBilling = 'delete from billing where id = $1'

            const { rowCount } = await connection.query(queryDeleteBilling, [id]);

            return res.status(201).json({ "Mensagem": "Cobrança deletada com sucesso." });            
        }else {
            return res.status(500).json({ "Mensagem": "Cobrança não foi deletada." })
        }

    } catch (error) {
        return res.status(500).json({ "Mensagem": "Erro desconhecido " + error.mensagem })
    }
};

module.exports = {
    deleteBilling
}
