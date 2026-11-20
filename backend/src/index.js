require('dotenv').config();
const express = require('express');
const cors = require('cors');
const usuarios = require('./routes/usuarios');
const publicaciones = require('./routes/publicaciones');

const app = express();
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

app.get('/api/salud', (req, res) => res.json({ ok: true }));
app.use('/api/usuarios', usuarios);
app.use('/api/publicaciones', publicaciones);

// Ruta que no existe
app.use((req, res) => res.status(404).json({ error: 'Ruta no encontrada' }));

// Error inesperado
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`));