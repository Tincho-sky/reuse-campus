const router = require('express').Router();
const pool = require('../db');

// Listar publicaciones
router.get('/', async (req, res, next) => {
  try {
    const r = await pool.query(
      `select p.*, u.nombre as propietario
       from publicacion p
       join usuario u on u.id = p.usuario_id
       order by p.fecha_publicacion desc`
    );
    res.json(r.rows);
  } catch (err) { next(err); }
});

// Ver una publicación
router.get('/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) {
      return res.status(400).json({ error: 'El id debe ser un número' });
    }
    const r = await pool.query(
      `select p.*, u.nombre as propietario
       from publicacion p
       join usuario u on u.id = p.usuario_id
       where p.id = $1`,
      [id]
    );
    if (r.rows.length === 0) {
      return res.status(404).json({ error: 'Publicación no encontrada' });
    }
    res.json(r.rows[0]);
  } catch (err) { next(err); }
});

// Crear publicación
// OJO: usuarioId viene del body SOLO de forma temporal.
// En la etapa de login lo reemplazaremos por el usuario autenticado (RN01).
router.post('/', async (req, res, next) => {
  try {
    const { titulo, descripcion, categoria, modalidad, usuarioId } = req.body;

    if (!titulo || !descripcion || !categoria || !modalidad || !usuarioId) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    if (!['DONACION', 'INTERCAMBIO'].includes(modalidad)) {
      return res.status(400).json({ error: 'La modalidad debe ser DONACION o INTERCAMBIO' });
    }

    const r = await pool.query(
      `insert into publicacion (titulo, descripcion, categoria, modalidad, usuario_id)
       values ($1, $2, $3, $4, $5)
       returning *`,
      [titulo, descripcion, categoria, modalidad, usuarioId]
    );
    res.status(201).json(r.rows[0]);
  } catch (err) {
    if (err.code === '23503') {
      return res.status(404).json({ error: 'El usuario indicado no existe' });
    }
    next(err);
  }
});

module.exports = router;