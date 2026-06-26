const userService = require('./userService');
const asyncHandler = require('../../middlewares/asyncHandler');

exports.register = asyncHandler(async (req, res) => {
    const { username, email, password, confirmPassword, fullName } = req.body;

    await userService.registerUser(username, email, password, fullName);

    req.flash("success", "Conta criada com sucesso! Faça seu login.");
    res.redirect("/login");
});

exports.login = asyncHandler(async (req, res) => {
    const { login, password } = req.body;

    const user = await userService.loginUser(login, password);

    const userData = await userService.getUserProfile(user.id);
    req.session.user = userData;

    req.flash("success", `Bem-vindo de volta, ${userData.username}!`);
    res.redirect("/items");
});

exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
};

exports.showLogin = (req, res) => {
    res.render('auth/login');
};

exports.showRegister = (req, res) => {
    res.render('auth/register');
}