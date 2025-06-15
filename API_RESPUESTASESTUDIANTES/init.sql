CREATE DATABASE IF NOT EXISTS respuestas;

USE respuestas;

CREATE TABLE IF NOT EXISTS respuestas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    question_id INT NOT NULL,
    answer VARCHAR(1) NOT NULL,
    is_correct BOOLEAN,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES preguntas.preguntas(id)
);

-- Insertar algunas respuestas de ejemplo
INSERT INTO respuestas (student_id, question_id, answer, is_correct)
VALUES 
(1, 1, 'D', true),
(1, 2, 'B', true),
(1, 3, 'A', false),
(2, 1, 'C', false),
(2, 2, 'B', true); 