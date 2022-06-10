const { format } = require('date-fns');

const checkUserBody = (user) => {
    const { name, email, password } = user;

    if(!name || !email || !password) {
        return "Há Campo(s) Obrigatório(s) Não Informado(s).!";
    }
}

const checkUserBodyNoPassword = (user) => {
    const { name, email, phone } = user;

    if(!name || !email || !phone) {
        return "Há Campo(s) Obrigatório(s) Não Informado(s).!";
    }
}


module.exports = {
    checkUserBody,
    checkUserBodyNoPassword    
}