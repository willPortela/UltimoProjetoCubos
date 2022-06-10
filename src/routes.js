const express = require('express');
const routes = express();

const { registerUser } = require('./controllers/users');
const handleLogin = require('./controllers/login');
const verificarLogin = require ('./middleware/verifyLogin');
const { registerCustomer } = require('./controllers/registerCustomer');
const { editCustomer } = require('./controllers/editCustomers');
const { listCustomer } = require('./controllers/listCustomers');
const { editUsers } = require ('./controllers/editUsers');

const { detailCustomers } = require ('./controllers/detailCustomers')
const { registerBilling } = require ('./controllers/registerBilling');
const { listBilling } = require ('./controllers/listBilling');
const { deleteCustomer } = require ('./controllers/deleteCustomer');
const { deleteBilling } = require ('./controllers/deleteBilling');
const { editBilling } = require ('./controllers/editBilling');

routes.post("/users", registerUser);
routes.post("/login", handleLogin);

routes.use(verificarLogin);
routes.put("/editusers", editUsers);
routes.post("/registercustomer",registerCustomer);
routes.put("/editcustomer/:id", editCustomer);
routes.get("/listcustomer", listCustomer);

routes.get("/detailCustomers/:id", detailCustomers);
routes.post("/registerbilling", registerBilling);
routes.get("/listbilling", listBilling);
routes.delete("/deletecustomer/:id", deleteCustomer);
routes.delete("/deletebilling/:id", deleteBilling);
routes.put("/editbilling/:id", editBilling);

module.exports = routes;