const express = require('express')
const UserController = require('../controllers/UserController')
const router = express.Router()


router.get('/', (req, res) => {
    res.send('Hello World!')
})
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

// const buyerSession = (function (req, res, next) {
//     if (req.session.UserId && req.session.role !== "buyer") {
//         const error = "Please Enter Valid Account"
//         return res.redirect(`/login?errors=${error}`)
//     }else{
//         next()       
//     }
// }) 

// const sellerSession = (function (req, res, next) {
//     if (req.session.UserId && req.session.role !== "seller") {
//         const error = "Please Enter Valid Account"
//         return res.redirect(`/login?errors=${error}`)
//     }else{
//         next()       
//     }
// })

// router.use('/buyer', buyerSession, buyer)
// router.use('/seller', sellerSession, seller)

// router.get('/logout', UserController.logOut)

module.exports = router