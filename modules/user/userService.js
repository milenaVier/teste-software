const User = require('./userModel');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

exports.registerUser = async(name, email, password) => {
    const emailExists = await User.findOne({ where: { email } });
    const nameExists = await User.findOne({ where: {name} });
    if (emailExists || nameExists) {
        throw new Error('Este email ou nome já está cadastrado');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    });
    return newUser;
};

exports.loginUser = async(login, password) => {
    const user = await User.findOne({ where: { [Op.or]: [{ email: login }, { name: login }]}
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Email/Usuario ou senha incorretos');
    }
    return user;
};

exports.getUserProfile = async(userId) => {
    const user = await User.findByPk(userId, { attributes: ['id', 'name', 'email', 'password']});
    if (!user) {
        throw new Error('Usuario não encontrado');
    }
    return user;
};