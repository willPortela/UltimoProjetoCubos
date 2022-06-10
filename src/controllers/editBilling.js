const connection = require('../database/connection');

const editBilling = async (req, res) => {
    const { customers, description, amount, due, status } = req.body;
    const { id } = req.params;

    try {
        const update =
            'update billing set customers=$1, description=$2, amount=$3, due=$4, status=$5 where id = $6';
        const detailUpdate = await connection.query(update, [customers, description, amount, due, status, id]);

        if (detailUpdate.rowCount === 0) {
            return res.status(500).json({ "Message": "Falha na Atualização" });
        }

        return res.status(200).json({ "Message": "Atualização Realizada com Sucesso." })

    } catch (error) {
        return res.status(500).json({ "Message": "Erro desconhecido " + error.mensagem })
    }
};

module.exports = {
    editBilling
}