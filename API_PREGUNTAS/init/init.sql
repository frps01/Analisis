-- Create and use the database
CREATE DATABASE IF NOT EXISTS BD10_PREGUNTAS;
USE BD10_PREGUNTAS;

-- ============================
-- Table: preguntas (questions)
-- ============================
CREATE TABLE IF NOT EXISTS preguntas (
    id INT AUTO_INCREMENT PRIMARY KEY,             -- Unique identifier for the question

    contenido TEXT NOT NULL,                       -- The question text

    alternativa_a VARCHAR(255) NOT NULL,           -- Answer option A
    alternativa_b VARCHAR(255) NOT NULL,           -- Answer option B
    alternativa_c VARCHAR(255) NOT NULL,           -- Answer option C
    alternativa_d VARCHAR(255) NOT NULL,           -- Answer option D

    respuesta_correcta CHAR(1) NOT NULL,           -- The correct answer (A, B, C, or D)

    asignatura VARCHAR(50),                        -- Subject (e.g. Math, Science)
    nivel INT                                      -- Difficulty level or grade
);

-- ============================
-- Table: ensayos (quizzes/tests)
-- ============================
CREATE TABLE IF NOT EXISTS ensayos (
    id INT AUTO_INCREMENT PRIMARY KEY,             -- Unique identifier for the ensayo
    asignatura VARCHAR(100) NOT NULL,              -- Subject (e.g. Math)
    cantidad_preguntas INT NOT NULL                -- Number of questions assigned
);

-- ===========================================
-- Join Table: preguntas_ensayos (many-to-many)
-- ===========================================
CREATE TABLE IF NOT EXISTS preguntas_ensayos (
    ensayo_id INT NOT NULL,                        -- Reference to ensayo
    pregunta_id INT NOT NULL,                      -- Reference to pregunta
    PRIMARY KEY (ensayo_id, pregunta_id),          -- Composite key to prevent duplicates

    FOREIGN KEY (ensayo_id) REFERENCES ensayos(id) ON DELETE CASCADE,
    FOREIGN KEY (pregunta_id) REFERENCES preguntas(id) ON DELETE CASCADE
);