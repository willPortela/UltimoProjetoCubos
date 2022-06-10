const connection = require('../database/connection');
const { checkUserBodyNoPassword } = require('../validations/validation.js');

const editCustomer = async (req, res) => {
    const { name, email, phone, zipcode, sector, complement, street, city, state } = req.body;
        
    const { id } = req.params;

    const error = checkUserBodyNoPassword(req.body);

    if(error) {
        return res.status(400).json({ "Message" : error })
    }

    try {
        const queryCustomer = 'select * from customers where email = $1';

        const customer = await connection.query(queryCustomer,[email]);
        const bdEmail = customer.rows[0].email;

        if (customer.rowCount > 0 && bdEmail !== email ) {
            return res.status(400).json({"Message": "Email já cadastrado."});
        }
        
        const update =
          'update customers set name=$1, email=$2, phone=$3, zipcode=$4, sector=$5, complement=$6, street=$7, city=$8, state=$9 where id = $10' ;
        const detailUpdate = await connection.query(update,[name,email,phone,zipcode,sector,complement,street,city,state, id]);
        
      if(detailUpdate.rowCount === 0){
          return res.status(500).json({ "Message": "Cadastro não efetuado" });
      }

    return res.status(200).json({ "Message": "Cadastro de Cliente atualizado com sucesso." })
        
    } catch (error) {
        return res.status(500).json({ "Message": "Erro desconhecido " + error.mensagem })
    }
};


module.exports = {
    editCustomer
}