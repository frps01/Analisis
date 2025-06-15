# Documentación API_RESPUESTASESTUDIANTES

## Descripción
API_RESPUESTASESTUDIANTES es un servicio REST que maneja las operaciones CRUD para las respuestas de los estudiantes a las preguntas de los ensayos. Permite crear, leer y eliminar respuestas, así como consultar el historial de respuestas de un estudiante específico.

## Base URL
```
http://localhost:8081
```

## Endpoints

### 1. Obtener todas las respuestas
```http
GET /answers
```

#### Respuesta
```json
[
  {
    "id": 1,
    "student_id": 1,
    "question_id": 1,
    "answer": "A",
    "is_correct": true,
    "created_at": "2024-03-15T10:30:00Z"
  }
]
```

### 2. Obtener respuestas de un estudiante específico
```http
GET /answers/student/:studentId
```

#### Parámetros
- `studentId`: ID del estudiante (número)

#### Respuesta
```json
[
  {
    "id": 1,
    "question_id": 1,
    "statement": "¿Cuál es el resultado de 2+2?",
    "answer": "A",
    "is_correct": true,
    "created_at": "2024-03-15T10:30:00Z"
  }
]
```

### 3. Crear una nueva respuesta
```http
POST /answers
```

#### Body
```json
{
  "student_id": 1,
  "question_id": 1,
  "answer": "A"
}
```

#### Respuesta
```json
{
  "id": 1,
  "student_id": 1,
  "question_id": 1,
  "answer": "A",
  "is_correct": true
}
```

### 4. Eliminar una respuesta
```http
DELETE /answers/:id
```

#### Parámetros
- `id`: ID de la respuesta (número)

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

### Respuesta
```typescript
interface Answer {
  id?: number;          // ID único de la respuesta
  student_id: number;   // ID del estudiante
  question_id: number;  // ID de la pregunta
  answer: string;       // Respuesta del estudiante (A, B, C o D)
  is_correct: boolean;  // Indica si la respuesta es correcta
  created_at?: string;  // Fecha y hora de creación
}
```

## Ejemplos de Uso

### Crear una nueva respuesta
```bash
curl -X POST http://localhost:8081/answers \
-H "Content-Type: application/json" \
-d '{
  "student_id": 1,
  "question_id": 1,
  "answer": "A"
}'
```

### Obtener respuestas de un estudiante
```bash
curl http://localhost:8081/answers/student/1
```

### Eliminar una respuesta
```bash
curl -X DELETE http://localhost:8081/answers/1
```

## Configuración

La API utiliza las siguientes variables de entorno (archivo .env):

```env
PORT_API = 8081
DB_USER = "root"
DB_PASSWORD = "password"
DB_NAME = "respuestas"
DB_PORT = 3306
DB_HOST = "mysql"
```

## Base de Datos

La API utiliza MySQL con la siguiente estructura:

```sql
CREATE TABLE respuestas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    question_id INT NOT NULL,
    answer VARCHAR(1) NOT NULL,
    is_correct BOOLEAN NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES preguntas.preguntas(id)
);
```

## Notas Importantes

1. La API verifica automáticamente si la respuesta es correcta comparándola con la respuesta correcta almacenada en la tabla de preguntas.

2. Al crear una respuesta, el campo `is_correct` se calcula automáticamente.

3. Las respuestas están vinculadas a preguntas existentes a través de una clave foránea.

4. Cada respuesta incluye un timestamp de creación automático.

5. La API está diseñada para trabajar en conjunto con la API_PREGUNTAS, por lo que requiere que ambas bases de datos estén disponibles y correctamente configuradas. 