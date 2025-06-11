CREATE DATABASE IF NOT EXISTS preguntas;

USE preguntas;

CREATE TABLE IF NOT EXISTS preguntas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(255),
    level VARCHAR(255),
    statement TEXT,
    option_a VARCHAR(255),
    option_b VARCHAR(255),
    option_c VARCHAR(255),
    option_d VARCHAR(255),
    correct_answer VARCHAR(1)
);

-- Insertar preguntas de ejemplo así:
INSERT INTO preguntas (subject, level, statement, option_a, option_b, option_c, option_d, correct_answer)
VALUES 
('Matemática', 'Medio', '¿Cuál es el resultado de 2+2?', '1', '2', '3', '4', 'D'),
('Historia', 'Fácil', '¿En qué año fue la independencia de Chile?', '1810', '1818', '1821', '1830', 'B');

INSERT INTO preguntas (subject, level, statement, option_a, option_b, option_c, option_d, correct_answer)
VALUES 
-- 1. Matemática
('Matemática', 'Medio', 
 '¿Cuál es el valor de x en la ecuación 2x + 3 = 11?', 
 '3', '4', '5', '6', 'B'),

-- 2. Lenguaje
('Lenguaje', 'Fácil', 
 '¿Cuál de las siguientes opciones contiene un sinónimo de "felicidad"?', 
 'Tristeza', 'Alegría', 'Miedo', 'Duda', 'B'),

-- 3. Historia
('Historia', 'Medio', 
 '¿Qué hecho ocurrió en Chile en el año 1818?', 
 'Batalla de Maipú', 'Guerra del Pacífico', 'Reforma Agraria', 'Independencia de Chile', 'D'),

-- 4. Ciencias
('Ciencias', 'Difícil', 
 '¿Cuál es el órgano encargado de bombear la sangre en el cuerpo humano?', 
 'Pulmón', 'Riñón', 'Corazón', 'Estómago', 'C'),

-- 5. Comprensión lectora
('Lenguaje', 'Difícil', 
 'Según el texto, ¿cuál es la causa principal del cambio climático?', 
 'La rotación de la Tierra', 'La actividad humana', 'El ciclo lunar', 'La evolución natural', 'B');

