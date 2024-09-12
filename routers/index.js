const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

const customer = require("./customer");
const merchant = require("./merchant");

router.get("/", UserController.homepage);
// register
router.get("/register", UserController.formRegister);
router.post("/register", UserController.postRegister);

//login
router.get("/login", UserController.formLogin);
router.post("/login", UserController.postLogin);

// middleware
router.use(function (req, res, next) {
  if (!req.session.UserId) {
    const error = "Please register before proceed";
    return res.redirect(`/login?errors=${error}`);
  } else {
    next();
  }
});

const customerSession = function (req, res, next) {
  if (req.session.UserId && req.session.role !== "customer") {
    const error = "Please Enter Valid Account";
    return res.redirect(`/login?errors=${error}`);
  } else {
    next();
  }
};

const merchantSession = function (req, res, next) {
  if (req.session.UserId && req.session.role !== "merchant") {
    const error = "Please Enter Valid Account";
    return res.redirect(`/login?errors=${error}`);
  } else {
    next();
  }
};

router.use("/customer", customerSession, customer);
router.use("/merchant", merchantSession, merchant);

router.get("/logout", UserController.logOut);

module.exports = router;
