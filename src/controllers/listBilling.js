
const connection = require('../database/connection');
const { format } = require('date-fns');

const listBilling = async (req, res) => {

    try {
        const dataAtual = new Date();
        const dataBR = format(new Date(dataAtual), 'MM/dd/yyyy');

        const queryDate = 'select due from billing where status = $1 and due < $2'
        const { rowCount } = await connection.query(queryDate, [2, dataBR]);

        if (rowCount > 0) {
            const editStatus = 'update billing set status = $1 where due < $2'
            const queryResponse = await connection.query(editStatus, [1, dataBR]);
        }
        const queryListBilling = 'select * from billing'
        const list = await connection.query(queryListBilling);

        const teste = 'select customers from billing where status = $1'
        const teste1 = await connection.query(teste, [1]);
        const array = [];

        for (let index = 0; index < teste1.rowCount; index++) {
            array.push(teste1.rows[index].customers);
        }

        //analise repetição de posições do array...
        let uniqueArr = [...new Set(array)];

        for (let index2 = 0; index2 < uniqueArr.length; index2++) {
            let element = uniqueArr[index2];
            const updCustClient = 'update customers set status = $1 where id = $2'
            const responseUpd = await connection.query(updCustClient, [1, element]);
        }

        return res.status(201).json(list.rows);
    } catch (error) {
        return res.status(500).json({ "Message": "Erro desconhecido " + error.message })
    }
};

module.exports = {
    listBilling
}