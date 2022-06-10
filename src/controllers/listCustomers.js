const connection = require('../database/connection');
const { format } = require('date-fns');

const listCustomer = async (req, res) => {
    try {
        const dataAtual = new Date();
        const dataBR = format(new Date(dataAtual), 'MM/dd/yyyy');

        const queryDate = 'select customers from billing where status = $1 and due < $2'
        const dateResponse = await connection.query(queryDate, [2, dataBR]);

        if (dateResponse.rowCount > 0) {
            const array = [];

            for (let index = 0; index < dateResponse.rowCount; index++) {
                array.push(dateResponse.rows[index].customers);
            }

            //analise repetição de posições do array...
            let uniqueArr = [...new Set(array)];

            for (let index2 = 0; index2 < uniqueArr.length; index2++) {
                let element = uniqueArr[index2];
                const updCustClient = 'update customers set status = $1 where id = $2'
                const responseUpd = await connection.query(updCustClient, [1, element]);
            }
        } else {
            const queryDate2 = 'select customers from billing where status = $1 and due >= $2'
            const dateResponse2 = await connection.query(queryDate2, [2, dataBR]);

            const array1 = [];

            for (let index = 0; index < dateResponse2.rowCount; index++) {
                array1.push(dateResponse2.rows[index].customers);
            }

            //analise repetição de posições do array...
            let uniqueArr = [...new Set(array1)];

            for (let index2 = 0; index2 < uniqueArr.length; index2++) {
                let element = uniqueArr[index2];
                const updCustClient = 'update customers set status = $1 where id = $2'
                const responseUpd = await connection.query(updCustClient, [2, element]);
            }
        }

        const listCustomers1 = 'select * from customers';
        const list = await connection.query(listCustomers1);

        return res.status(201).json(list.rows);
    } catch (error) {
        return res.status(500).json({ "Message": "Erro desconhecido " + error.message })
    }
};

module.exports = {
    listCustomer
}