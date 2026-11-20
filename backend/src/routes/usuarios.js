const router = require('express').Router();
const bcrypt = require('bcryptjs');
const pool = require('../db');

// Registro de usuario
router.post('/registro', async (req, res, next) => {
  try {
    const { nombre, correo, password } = req.body;

    if (!nombre || !correo || !password) {
      return res.status(400).json({ error: 'Nombre, correo y contraseña son obligatorios' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    const hash = await bcrypt.hash(password, 10);
    const r = await pool.query(
      `insert into usuario (nombre, correo, password)
       values ($1, $2, $3)
       returning id, nombre, correo, rol, estado`,
      [nombre, correo.toLowerCase(), hash]
    );
    res.status(201).json(r.rows[0]);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Ya existe un usuario con ese correo' });
    }
    next(err);
  }
});

module.exports = router;