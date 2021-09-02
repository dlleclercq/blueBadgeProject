/*
add - post
edit/:id - put
delete/:id - delete
view/:id - get
viewall - get
*/

const express = require('express');
const router = express.Router();
const validateSession = require("../middleware/validateSession");
const Expense = require("../db").import("../models/expense");

router.get('/practice', function(req, res) {
    res.send("this is a practice route!");
});

router.post('/add', (req, res) => {
    const expenseAdd = {
        category: req.body.expense.category,
        name: req.body.expense.name,
        amount: req.body.expense.amount,
        dueDate: req.body.expense.dueDate,
        reoccuring: req.body.expense.reoccuring,
    }
    Expense.create(expenseAdd)
    .then(expense => res.status(200).json(expense))
    .catch(err => res.status(500).json({error: err}))
});

router.put('/edit/:id', function(req, res) {
    const updateExpense = {
        category: req.body.expense.category,
        name: req.body.expense.name,
        amount: req.body.expense.amount,
        dueDate: req.body.expense.dueDate,
        reoccuring: req.body.expense.reoccuring
    };
    const query = { where: { id: req.params.id}};

    Expense.update(updateExpense, query)
    .then((expenses) => res.status(200).json(expenses))
    .catch((err) => res.status(500).json({error:err}));
});

router.delete('/delete/:id', function(req, res) {
    const query = {where: {id: req.params.id, owner_id: req.user.id}};

    Expense.destroy(query)
    .then(() => res.status(200).json({message: "Expense Deleted"}))
    .catch((err) => res.status(500).json({error: err}));
});

router.get('/all', (req, res) => {
    let userid = req.user.id;
    Expense.findAll({where:{owner_id: userid}})
    .then(expenses => res.status(200).json(expenses))
    .catch(err => res.status(500).json({error: err}))
});

router.get('/view/:id', (req, res) => {
    let id = req.params.id;

    Expense.findAll({where: {id: id}})
    .then(expenses => res.status(200).json(expenses))
    .catch(err => res.status(500).json({error: err}))
});

module.exports = router;