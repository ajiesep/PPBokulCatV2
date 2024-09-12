const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router()

const customer = require('./customer')
const merchant = require('./merchant')


router.get('/', UserController.homepage)
// register
router.get('/register', UserController.formRegister)
router.post('/register', UserController.postRegister)

//login
router.get('/login', UserController.formLogin)
router.post('/login', UserController.postLogin)

// middleware
router.use(function (req, res, next) {
    if (!req.session.UserId) {
        const error = "Please register before proceed"
        return res.redirect(`/login?errors=${error}`)
    }else{
        next()       
    }     
})

const customSession = (function (req, res, next) {
    if (req.session.UserId && req.session.role !== "customer") {
        const error = "Please Enter Valid Account"
        return res.redirect(`/login?errors=${error}`)
    }else{
        next()       
    }
}) 

const merSession = (function (req, res, next) {
    if (req.session.UserId && req.session.role !== "merchant") {
        const error = "Please Enter Valid Account"
        return res.redirect(`/login?errors=${error}`)
    }else{
        next()       
    }
})

router.use('/customer', customSession, customer)
router.use('/merchant', merSession, merchant)

router.get('/logout', UserController.logOut)

module.exports = router