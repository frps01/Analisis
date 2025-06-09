const database = require('../db.js'); // Import the database connection


/**
 * this function retrieves all preguntas from the database
 * @param {*} req  This is the request object
 * @param {*} res  This is the response object
 */

const getPreguntas = (req, res) => { //This function retrieves all preguntas from the database
    database.query('SELECT * FROM preguntas', (err, rows) => { 
        if (err ) {
            console.error("Error retrieving preguntas: ", err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.json(rows);
});
};


/**
 * this function adds a pregunta to the database
 * validdates rquiered fields and performs SQL INSERT using prepared statements
 * @param {*} req  This is the request object
 * @param {*} res  This is the response object
 */

const addPregunta = (req, res) => { //This function adds a pregunta to the database
    const {
        contenido,
        alternativa_a,
        alternativa_b,
        alternativa_c,
        alternativa_d,
        respuesta_correcta,
        asignatura,
        nivel
    } = req.body;

    // Ensure all required fields are provided
    if(!contenido || !alternativa_a || !alternativa_b || !alternativa_c || !alternativa_d || !respuesta_correcta || !asignatura || !nivel) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Perform SQL INSERT using prepared statements
    const query = 'INSERT INTO preguntas (contenido, alternativa_a, alternativa_b, alternativa_c, alternativa_d, respuesta_correcta, asignatura, nivel) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    database.query(query,[
        contenido,
        alternativa_a,
        alternativa_b,
        alternativa_c,
        alternativa_d,
        respuesta_correcta,
        asignatura,
        nivel
    ], (err, result) => {
        if (err) {
            console.error("Error adding pregunta: ", err);
            return res.status(500).json({ error: 'Database error' });
        }
        // If the insert was successful, return the ID of the new pregunta
        res.status(201).json({ message: 'Pregunta added successfully', id: result.insertId });
    });
}


module.exports = {
    getPreguntas,
    addPregunta
};