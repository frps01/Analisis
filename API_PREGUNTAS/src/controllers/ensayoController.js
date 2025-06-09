// src/controllers/ensayoController.js
const db = require('../db'); // Import database connection

/**
 * Retrieve all ensayos from the database
 */
const getEnsayos = (req, res) => {
  db.query('SELECT * FROM ensayos', (err, rows) => {
    if (err) {
      console.error('Error retrieving ensayos:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
};

/**
 * Create a new ensayo and assign random preguntas based on subject
 */
const addEnsayo = (req, res) => {
  const { asignatura, cantidad_preguntas } = req.body;

  if (!asignatura || typeof cantidad_preguntas !== 'number') {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  // Step 1: Insert ensayo
  const insertEnsayo = 'INSERT INTO ensayos (asignatura, cantidad_preguntas) VALUES (?, ?)';
  db.query(insertEnsayo, [asignatura, cantidad_preguntas], (err, result) => {
    if (err) {
      console.error('Error inserting ensayo:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    const ensayoId = result.insertId;

    // Step 2: Get random preguntas from the given subject
    const selectPreguntas = `
      SELECT id FROM preguntas 
      WHERE asignatura = ? 
      ORDER BY RAND() 
      LIMIT ?
    `;
    db.query(selectPreguntas, [asignatura, cantidad_preguntas], (err, preguntas) => {
      if (err) {
        console.error('Error selecting preguntas:', err);
        return res.status(500).json({ error: 'Error selecting preguntas' });
      }

      if (preguntas.length === 0) {
        return res.status(404).json({ error: 'No questions available for this subject' });
      }

      // Step 3: Insert into preguntas_ensayos relation table
      const relaciones = preguntas.map(p => [ensayoId, p.id]);
      const insertRelacion = 'INSERT INTO preguntas_ensayos (ensayo_id, pregunta_id) VALUES ?';

      db.query(insertRelacion, [relaciones], (err) => {
        if (err) {
          console.error('Error linking preguntas to ensayo:', err);
          return res.status(500).json({ error: 'Error linking preguntas to ensayo' });
        }

        res.status(201).json({
          message: 'Ensayo created and preguntas assigned successfully',
          ensayo_id: ensayoId,
          preguntas_asignadas: preguntas.length
        });
      });
    });
  });
};

/**
 * Add a specific pregunta to a specific ensayo
 */
const addPreguntaToEnsayo = (req, res) => {
  const { ensayo_id, pregunta_id } = req.body;
  if (!ensayo_id || !pregunta_id) {
    return res.status(400).json({ error: 'Missing ensayo_id or pregunta_id' });
  }

  const sql = 'INSERT INTO preguntas_ensayos (ensayo_id, pregunta_id) VALUES (?, ?)';
  db.query(sql, [ensayo_id, pregunta_id], (err) => {
    if (err) {
      console.error('Error linking pregunta to ensayo:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.status(201).json({ message: 'Pregunta added to ensayo' });
  });
};

/**
 * Get all preguntas for a specific ensayo
 */
const getPreguntasByEnsayo = (req, res) => {
  const ensayoId = req.params.id;

  const sql = `
    SELECT p.* FROM preguntas p
    JOIN preguntas_ensayos pe ON p.id = pe.pregunta_id
    WHERE pe.ensayo_id = ?
  `;

  db.query(sql, [ensayoId], (err, rows) => {
    if (err) {
      console.error('Error fetching preguntas by ensayo:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    res.json(rows);
  });
};

module.exports = {
  getEnsayos,
  addEnsayo,
  addPreguntaToEnsayo,
  getPreguntasByEnsayo
};