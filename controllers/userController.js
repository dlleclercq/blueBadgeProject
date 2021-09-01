// this is for user login and signup

const router = require('express').Router()
const User = require('../db').import('../models/user')

//USER SIGNUP

router.post('/signup', function (req, res) {

    User.create({
        email: req.body.user.email,
        password: req.body.user.password
    })

    .then(
        function createSuccess(user) {
            res.status(200).json({
                user: user,
                message: 'User Successfully Signed Up'
            })
        }
    )

    .catch(err => res.status(500).json({ error: err}))
})

//USER LOGIN

router.post('/login', function(req, res) {

    User.findOne ({
        where: {
            email: req.body.user.email
        }
    })

    .then(function loginSuccess(user) {
        if (user) {
            
            res.status(200).json({
                user: user,
                message: 'User Successfully Logged In'
            })
        }else {
            res.status(500).json({ error: 'User does not exist.'})
        }
    })
    .catch(err => res.status(500).json ({ error: err}))
})

module.exports = router;