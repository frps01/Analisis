const db = require('../db');

/* ---- GET /answers ----------------------------------- */
async function getAll(req, res) {
  try {
    console.log('Intentando obtener respuestas...');
    const [rows] = await db.query('SELECT * FROM respuestas');
    console.log('Respuestas obtenidas:', rows);
    res.json(rows);
  } catch (e) {
    console.error('Error al obtener respuestas:', e);
    res.status(500).json({ error: e.message });
  }
}

/* ---- GET /answers/student/:studentId ------------------------------- */
async function getByStudent(req, res) {
  try {
    const [rows] = await db.query(`
      SELECT 
        r.id,
        r.question_id,
        p.statement,
        r.answer,
        r.is_correct,
        r.created_at
      FROM respuestas r
      JOIN preguntas.preguntas p ON r.question_id = p.id
      WHERE r.student_id = ?
      ORDER BY r.created_at DESC
    `, [req.params.studentId]);
    res.json(rows);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

/* ---- POST /answers ---------------------------------- */
async function create(req, res) {
  try {
    const { student_id, question_id, answer } = req.body;
    
    // Primero obtenemos la respuesta correcta de la pregunta
    const [questionRows] = await db.query('SELECT correct_answer FROM preguntas.preguntas WHERE id = ?', [question_id]);
    if (!questionRows.length) {
      return res.status(404).json({ error: 'Pregunta no encontrada' });
    }
    
    const is_correct = questionRows[0].correct_answer === answer;
    
    const sql = `INSERT INTO respuestas (student_id, question_id, answer, is_correct) VALUES (?, ?, ?, ?)`;
    const [result] = await db.query(sql, [student_id, question_id, answer, is_correct]);
    
    res.status(201).json({ 
      id: result.insertId, 
      student_id, 
      question_id, 
      answer, 
      is_correct 
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

/* ---- DELETE /answers/:id ---------------------------- */
async function remove(req, res) {
  try {
    const [result] = await db.query('DELETE FROM respuestas WHERE id = ?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Respuesta no encontrada' });
    res.status(204).end();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

module.exports = { getAll, getByStudent, create, remove }; 