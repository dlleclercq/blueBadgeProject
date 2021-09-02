const express = require("express");
const router = express.Router();
const validateSession = require("../middleware/validateSession");
const Expense = require("../db").import("../models/expense");

router.get("/practice", function (req, res) {
  res.send("this is a practice route!");
});

router.post("/add", validateSession, (req, res) => {
  const expenseAdd = {
    category: req.body.expense.category,
    name: req.body.expense.name,
    amount: req.body.expense.amount,
    dueDate: req.body.expense.dueDate,
    reoccuring: req.body.expense.reoccuring,
    owner_id: req.user.id
  };
  Expense.create(expenseAdd)
    .then((expense) => res.status(200).json(expense))
    .catch((err) => res.status(500).json({ error: err }));
});

router.put("/edit/:id", validateSession, function (req, res) {
  const updateExpense = {
    category: req.body.expense.category,
    name: req.body.expense.name,
    amount: req.body.expense.amount,
    dueDate: req.body.expense.dueDate,
    reoccuring: req.body.expense.reoccuring,
    owner_id: req.user.id
  };
  const query = { where: { id: req.params.id } };

  Expense.update(updateExpense, query)
    .then((expenses) => res.status(200).json(expenses))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/delete/:id", validateSession, function (req, res) {
  const query = { where: { id: req.params.id, owner_id: req.user.id } };

  Expense.destroy(query)
    .then(() => res.status(200).json({ message: "Expense Deleted" }))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/all", validateSession, (req, res) => {
  Expense.findAll( { where: {owner_id: req.user.id} } )
    .then((expenses) => res.status(200).json(expenses))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/view/:id", validateSession, (req, res) => {
  let id = req.params.id;

  Expense.findAll({ where: { id: id, owner_id: req.user.id } })
    .then((expenses) => res.status(200).json(expenses))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
