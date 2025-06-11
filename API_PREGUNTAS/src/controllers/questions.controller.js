const db = require('../db');

/* ---- GET /questions ----------------------------------- */
async function getAll(req, res) {
  try {
    const [rows] = await db.query('SELECT * FROM preguntas');
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
}

/* ---- GET /questions/:id ------------------------------- */
async function getOne(req, res) {
  try {
    const [rows] = await db.query('SELECT * FROM preguntas WHERE id = ?', [req.params.id]);
    if (!rows.length) return res.status(404).json({ error: 'Pregunta no encontrada' });
    res.json(rows[0]);
  } catch (e) { res.status(500).json({ error: e.message }); }
}

/* ---- POST /questions ---------------------------------- */
async function create(req, res) {
  try {
    const { subject, level, statement, option_a, option_b, option_c, option_d, correct_answer } = req.body;
    const sql = `INSERT INTO preguntas
        (subject, level, statement, option_a, option_b, option_c, option_d, correct_answer)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await db.query(sql, [
      subject, level, statement, option_a, option_b, option_c, option_d, correct_answer,
    ]);
    res.status(201).json({ id: result.insertId, ...req.body });
  } catch (e) { res.status(500).json({ error: e.message }); }
}

/* ---- PUT /questions/:id ------------------------------- */
async function update(req, res) {
  try {
    const { subject, level, statement, option_a, option_b, option_c, option_d, correct_answer } = req.body;
    const sql = `UPDATE preguntas SET
        subject=?, level=?, statement=?, option_a=?, option_b=?, option_c=?, option_d=?, correct_answer=?
        WHERE id=?`;
    const [result] = await db.query(sql, [
      subject, level, statement, option_a, option_b, option_c, option_d, correct_answer,
      req.params.id,
    ]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Pregunta no encontrada' });
    res.json({ id: req.params.id, ...req.body });
  } catch (e) { res.status(500).json({ error: e.message }); }
}

/* ---- DELETE /questions/:id ---------------------------- */
async function remove(req, res) {
  try {
    const [result] = await db.query('DELETE FROM preguntas WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Pregunta no encontrada' });
    res.status(204).end();            // 204 = sin contenido
  } catch (e) { res.status(500).json({ error: e.message }); }
}

module.exports = { getAll, getOne, create, update, remove };
