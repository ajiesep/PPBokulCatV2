const { User, Account } = require("../models");
const bcrypt = require("bcryptjs");

class UserController {
  static async homepage(req, res) {
    try {
      res.redirect("/login");
    } catch (error) {
      res.send(error);
    }
  }
  static async formRegister(req, res) {
    try {
      res.render("registerForm");
    } catch (error) {
      res.send(error.message);
    }
  }
  static async postRegister(req, res) {
    try {
      const { name, email, password, address, phoneNumber, role } = req.body;
      let newUser = await User.create({ email, password, role });
      await Account.create({
        name,
        email,
        password,
        address,
        phoneNumber,
        UserId: newUser.id,
        role,
      });
      res.redirect("/");
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        error = error.errors.map((el) => {
          return el.message;
        });
        res.redirect(`/register?errors=${error}`);
      } else {
        res.send(error.message);
      }
    }
  }

  static async formLogin(req, res) {
    try {
      const { errors } = req.query;

      res.render("loginForm", { errors });
    } catch (error) {
      res.send(error.message);
    }
  }
  static async postLogin(req, res) {
    try {
      const { email, password } = req.body;

      let find = await User.findOne({ where: { email } });
      // console.log("User found:", find); // Cek apakah user ditemukan

      if (find) {
        // compare pass yg di input dengan yg di db
        const isValidPassword = bcrypt.compareSync(password, find.password);
        // console.log("Is valid password:", isValidPassword); // Cek apakah password benar

        if (isValidPassword) {
          req.session.UserId = find.id;
          req.session.role = find.role;
          // console.log("Session UserId set:", req.session.UserId);
          // console.log("Session set:", req.session); // Cek apakah session sudah diset

          if (find.role === "customer") {
            // console.log("Redirecting to /customer");
            // console.log(
            //   "Redirecting to:",
            //   find.role === "customer" ? "/customer" : `/merchant/${account.id}`
            // );
            return res.redirect("/customer");
          } else if (find.role === "merchant") {
            console.log("Finding account for user:", find.id);

            let account = await Account.findOne({
              where: {
                UserId: find.id,
              },
            });
            console.log("Account found:", account);

            return res.redirect(`/merchant/${account.id}`);
          }
        } else {
          const error = "invalid Email / Password";
          return res.redirect(`/login?errors=${error}`);
        }
      } else {
        const error = "invalid Email / Password";
        return res.redirect(`/login?errors=${error}`);
      }
    } catch (error) {
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        error = error.errors.map((el) => {
          return el.message;
        });
        res.redirect(`/login?errors=${error}`);
      } else {
        res.send(error);
      }
    }
  }

  static async logOut(req, res) {
    req.session.destroy((error) => {
      if (error) {
        res.send(error);
      } else {
        res.redirect("/login");
      }
    });
  }
}
module.exports = UserController;
