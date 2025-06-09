# Backend Update Summary – API_PREGUNTAS

##  Summary of Key Code Changes

- **Database Initialization**
  - Switched from `mysql.createConnection` ➝ `mysql.createPool` for better concurrency and stability in Docker.
  - Connection logic now uses `.getConnection()` with retry loop if DB is not ready.

- **Server Startup (`index.js`)**
  - Introduced `connectWithRetry()` to delay Express startup until MySQL is available.
  - Logging improved for DB config and retry attempts.

- **Routing**
  - `src/routes/index.js` now correctly imports `preguntasController` from `../controllers/index.js`.
  - Defined two endpoints:
    - `GET /preguntas` ➝ retrieves all preguntas
    - `POST /preguntas` ➝ adds a new pregunta to DB

- **Controller Fixes**
  
  - Connected `addPregunta()` to insert prepared statements from request body.

---

##  Testing Done (Bruno)

### POST `/preguntas`
Payload:
```json
{
  "contenido": "Hva er 2 + 2?",
  "alternativa_a": "3",
  "alternativa_b": "4",
  "alternativa_c": "5",
  "alternativa_d": "6",
  "respuesta_correcta": "B",
  "asignatura": "matematikk",
  "nivel": 1
}
```

✅ Response:
```json
{ "message": "Pregunta added successfully", "id": 1 }
```

### GET `/preguntas`
✅ Response:
Returns list of all inserted preguntas.

---

_Changes committed and tagged for reproducibility._