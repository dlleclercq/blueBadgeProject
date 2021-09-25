require("dotenv").config();
let express = require("express");
const sequelize = require("./db");
const app = express();
app.use(require("./middleware/headers"));
sequelize.sync();
app.use(express.json());
const user = require("./controllers/userController");
const expense = require("./controllers/expenseController");
app.use("/user", user);
app.use("/expense", expense);
// If your using express to listen on a port it will be app.listen. 
// If your using node http to listen on a port it will be http.listen.  
app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`)
})
