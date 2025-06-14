# Documentación API_PREGUNTAS

## Descripción
API_PREGUNTAS es un servicio REST que maneja las operaciones CRUD para las preguntas de los ensayos. Permite crear, leer, actualizar y eliminar preguntas con sus respectivas opciones y respuestas correctas.

## Base URL
```
http://localhost:8080
```

## Endpoints

### 1. Obtener todas las preguntas
```http
GET /questions
```

#### Respuesta
```json
[
  {
    "id": 1,
    "subject": "Matemática",
    "level": "Medio",
    "statement": "¿Cuál es el resultado de 2+2?",
    "option_a": "1",
    "option_b": "2",
    "option_c": "3",
    "option_d": "4",
    "correct_answer": "D"
  }
]
```

### 2. Obtener una pregunta específica
```http
GET /questions/:id
```

#### Parámetros
- `id`: ID de la pregunta (número)

#### Respuesta
```json
{
  "id": 1,
  "subject": "Matemática",
  "level": "Medio",
  "statement": "¿Cuál es el resultado de 2+2?",
  "option_a": "1",
  "option_b": "2",
  "option_c": "3",
  "option_d": "4",
  "correct_answer": "D"
}
```

### 3. Crear una nueva pregunta
```http
POST /questions
```

#### Body
```json
{
  "subject": "Matemática",
  "level": "Medio",
  "statement": "¿Cuál es el resultado de 2+2?",
  "option_a": "1",
  "option_b": "2",
  "option_c": "3",
  "option_d": "4",
  "correct_answer": "D"
}
```

#### Respuesta
```json
{
  "id": 1,
  "subject": "Matemática",
  "level": "Medio",
  "statement": "¿Cuál es el resultado de 2+2?",
  "option_a": "1",
  "option_b": "2",
  "option_c": "3",
  "option_d": "4",
  "correct_answer": "D"
}
```

### 4. Actualizar una pregunta
```http
PUT /questions/:id
```

#### Parámetros
- `id`: ID de la pregunta (número)

#### Body
```json
{
  "subject": "Matemática",
  "level": "Medio",
  "statement": "¿Cuál es el resultado de 2+2?",
  "option_a": "1",
  "option_b": "2",
  "option_c": "3",
  "option_d": "4",
  "correct_answer": "D"
}
```

#### Respuesta
```json
{
  "id": 1,
  "subject": "Matemática",
  "level": "Medio",
  "statement": "¿Cuál es el resultado de 2+2?",
  "option_a": "1",
  "option_b": "2",
  "option_c": "3",
  "option_d": "4",
  "correct_answer": "D"
}
```

### 5. Eliminar una pregunta
```http
DELETE /questions/:id
```

#### Parámetros
- `id`: ID de la pregunta (número)

#### Respuesta
- Status: 204 No Content

## Códigos de Estado

- `200 OK`: La petición se ha completado exitosamente
- `201 Created`: El recurso se ha creado exitosamente
- `204 No Content`: La petición se ha completado exitosamente pero no hay contenido para devolver
- `400 Bad Request`: La petición es incorrecta
- `404 Not Found`: El recurso no se encuentra
- `500 Internal Server Error`: Error interno del servidor

## Estructura de Datos

### Pregunta
```typescript
interface Question {
  id?: number;          // ID único de la pregunta
  subject: string;      // Materia (ej: "Matemática", "Lenguaje", etc.)
  level: string;        // Nivel de dificultad (ej: "Fácil", "Medio", "Difícil")
  statement: string;    // Enunciado de la pregunta
  option_a: string;     // Opción A
  option_b: string;     // Opción B
  option_c: string;     // Opción C
  option_d: string;     // Opción D
  correct_answer: string; // Respuesta correcta (A, B, C o D)
}
```

## Ejemplos de Uso

### Crear una nueva pregunta
```bash
curl -X POST http://localhost:8080/questions \
-H "Content-Type: application/json" \
-d '{
  "subject": "Matemática",
  "level": "Medio",
  "statement": "¿Cuál es la derivada de f(x) = x²?",
  "option_a": "f\'(x) = x",
  "option_b": "f\'(x) = 2x",
  "option_c": "f\'(x) = 2",
  "option_d": "f\'(x) = x²",
  "correct_answer": "B"
}'
```

### Obtener todas las preguntas
```bash
curl http://localhost:8080/questions
```

### Actualizar una pregunta
```bash
curl -X PUT http://localhost:8080/questions/1 \
-H "Content-Type: application/json" \
-d '{
  "subject": "Matemática",
  "level": "Difícil",
  "statement": "¿Cuál es la derivada de f(x) = x²?",
  "option_a": "f\'(x) = x",
  "option_b": "f\'(x) = 2x",
  "option_c": "f\'(x) = 2",
  "option_d": "f\'(x) = x²",
  "correct_answer": "B"
}'
```

### Eliminar una pregunta
```bash
curl -X DELETE http://localhost:8080/questions/1
```

## Configuración

La API utiliza las siguientes variables de entorno (archivo .env):

```env
PORT_API = 8080
DB_USER = "root"
DB_PASSWORD = "password"
DB_NAME = "preguntas"
DB_PORT = 3306
DB_HOST = "mysql"
```

## Base de Datos

La API utiliza MySQL con la siguiente estructura:

```sql
CREATE TABLE preguntas (
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
``` 