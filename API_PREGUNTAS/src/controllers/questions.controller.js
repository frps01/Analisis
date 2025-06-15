const db = require('../db');

/* ---- GET /questions ----------------------------------- */
async function getAll(req, res) {
  try {
    console.log('Intentando obtener preguntas...');
    const [rows] = await db.query('SELECT * FROM preguntas');
    console.log('Preguntas obtenidas:', rows);
    res.json(rows);
  } catch (e) { 
    console.error('Error al obtener preguntas:', e);
    res.status(500).json({ error: e.message }); 
  }
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
  let connection;
  try {
    // Obtenemos una conexión del pool
    connection = await db.getConnection();
    
    // Iniciamos la transacción
    await connection.beginTransaction();

    try {
      // Verificamos si la pregunta existe
      const [question] = await connection.query('SELECT id FROM preguntas WHERE id = ?', [req.params.id]);
      if (!question.length) {
        await connection.rollback();
        return res.status(404).json({ error: 'Pregunta no encontrada' });
      }

      // Eliminamos las respuestas asociadas
      await connection.query('DELETE FROM respuestas.respuestas WHERE question_id = ?', [req.params.id]);

      // Eliminamos la pregunta
      const [result] = await connection.query('DELETE FROM preguntas WHERE id = ?', [req.params.id]);
      
      if (!result.affectedRows) {
        await connection.rollback();
        return res.status(404).json({ error: 'Pregunta no encontrada' });
      }

      // Si todo salió bien, confirmamos la transacción
      await connection.commit();
      res.status(204).end();
    } catch (e) {
      // Si algo sale mal, revertimos la transacción
      await connection.rollback();
      throw e;
    }
  } catch (e) {
    console.error('Error al eliminar pregunta:', e);
    res.status(500).json({ error: e.message });
  } finally {
    // Liberamos la conexión
    if (connection) {
      connection.release();
    }
  }
}

module.exports = { getAll, getOne, create, update, remove };
