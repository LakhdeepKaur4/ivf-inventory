// const TransactionsLogic = require('./business/transactions-logic')
// const ItemsLogic = require('./business/items-logic.js')
// const InventoryLogic = require('./business/inventory-logic.js')
// const OrdersLogic = require('./business/orders-logic')
// const ItemsRoutes = require('./routes/items.js')
// const TransactionsRoutes = require('./routes/transactions.js')
// const OrdersRoutes = require('./routes/orders.js')
// const InventoryRoutes = require('./routes/inventory.js')
// const Q = require('q')
// const mongoose = require('mongoose')
// mongoose.Promise = Q.Promise
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jjsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults()

var express = require('express');
var app = express();
const cors = require('cors');
const Sequelize = require('sequelize');
var bodyParser = require('body-parser');
const path = require('path');
// var mongoose = require('mongoose');
// var port = 8082;
Promise = require('bluebird'); 
const { port, env } = require("./config/vars");
const mongoose = require("./config/mongoose");
setTimeout(function(){
    require('./test');
},5000);


// function Inventory() {
//   // this.connect = mongoose.connect.bind(mongoose)
//   this.items = ItemsLogic()
//   this.transactions = TransactionsLogic(this.items)
//   this.orders = OrdersLogic(this.transactions)
//   this.inventory = InventoryLogic(this.transactions, this.orders)
//   this.itemsRoutes = ItemsRoutes(this.items)
//   this.transactionsRoutes = TransactionsRoutes(this.transactions)
//   this.ordersRoutes = OrdersRoutes(this.orders)
//   this.inventoryRoutes = InventoryRoutes(this.inventory)
//   this.allRoutes = [this.itemsRoutes, this.transactionsRoutes, this.inventoryRoutes, this.ordersRoutes]
//   this.startMonitor = this.transactions.startMonitor
//   this.stopMonitor = this.transactions.stopMonitor
// }

mongoose.connect();
app.use(middlewares);
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
app.use(bodyParser.json({ limit: '100mb' ,extended:true,type:"application/json"}));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true,type:'application/x-www-form-urlencoding'}));

app.use('/public',express.static(path.resolve(__dirname, 'public')));
app.get('/', function(req, res){
    res.send('Inventory app');
});

var routes = require('./routes');

app.use('/api', routes);

const mysqlDB = require('./config/mysql');
require('./config/relations');

mysqlDB.sync({force:false})
.then(res => {
    console.log('Connection Succeded');
})
.catch(err => {
    // console.log('MySql connection error',err);
})

app.listen(port, () => console.info(`server started on port ${port} (${env})`));

// module.exports = Inventory
