const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email et mot de passe requis.' });
    }

    const userExists = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (userExists) {
        return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.prepare('INSERT INTO users (email, mot_de_passe) VALUES (?, ?)').run(email, hashedPassword);

    res.status(201).json({ message: 'Utilisateur créé avec succès.' });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) {
        return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
    }

    const passwordIsValid = await bcrypt.compare(password, user.mot_de_passe);

    if (!passwordIsValid) {
        return res.status(400).json({ message: 'Email ou mot de passe incorrect.' });
    }

    const token = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '5m' }
    );

    const refreshToken = jwt.sign(
        { email: user.email },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );

    res.status(200).json({ message: 'Connexion réussie.', token, refreshToken });
};

exports.refresh = (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token manquant.' });
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const token = jwt.sign(
            { email: decoded.email },
            process.env.JWT_SECRET,
            { expiresIn: '5m' }
        );
        res.status(200).json({ token });
    } catch (err) {
        res.status(401).json({ message: 'Refresh token invalide ou expiré.' });
    }
};
