require("dotenv").config();
let express = require("express");
const sequelize = require("./db");
const app = express();
app.use(require('./middleware/headers'));
sequelize.sync();
app.use(express.json());
const user = require('./controllers/userController');
const expense = require('./controllers/expenseController');
app.use('/user', user);
app.use('/expense', expense);
app.listen(3000, function () {
    console.log("App is listening on port 3000");
})

module.exports = router; 