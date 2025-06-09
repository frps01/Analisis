// Load all preguntas and display them as table rows
function loadPreguntas() {
  fetch('/preguntas')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.querySelector('#pregunta-table tbody');
      tableBody.innerHTML = ''; // Clear previous entries

      data.forEach(p => {
        const row = document.createElement('tr');

        const highlight = (letter, value) => {
        return p.respuesta_correcta === letter ? `<td class="correct">${value}</td>` : `<td>${value}</td>`;
        };

    row.innerHTML = `
    <td>${p.contenido}</td>
    ${highlight('A', p.alternativa_a)}
    ${highlight('B', p.alternativa_b)}
    ${highlight('C', p.alternativa_c)}
    ${highlight('D', p.alternativa_d)}
    <td>${p.respuesta_correcta}</td>
    <td>${p.nivel}</td>
    <td>${p.asignatura}</td>
  `;

  tableBody.appendChild(row);
    });
    });
}

// Initial load
loadPreguntas();

// Handle form submission
document.getElementById('pregunta-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const form = event.target;
  const data = {
    contenido: form.contenido.value,
    alternativa_a: form.alternativa_a.value,
    alternativa_b: form.alternativa_b.value,
    alternativa_c: form.alternativa_c.value,
    alternativa_d: form.alternativa_d.value,
    respuesta_correcta: form.respuesta_correcta.value,
    asignatura: form.asignatura.value,
    nivel: parseInt(form.nivel.value)
  };

  fetch('/preguntas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(() => {
    loadPreguntas();   // Refresh table without reloading the page
    form.reset();      // Clear inputs
  });
});

// Create new ensayo
document.getElementById('ensayo-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const form = e.target;

  const data = {
    asignatura: form.asignatura.value,
    cantidad_preguntas: parseInt(form.cantidad_preguntas.value)
  };

  fetch('/ensayos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(result => {
      alert(`✅ Ensayo creado (ID: ${result.ensayo_id}) con ${result.preguntas_asignadas} preguntas`);
      form.reset();
      loadEnsayos();
    });
});

// Load all ensayos
function loadEnsayos() {
  fetch('/ensayos')
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('ensayo-list');
      list.innerHTML = '';
      data.forEach(e => {
        const item = document.createElement('li');
        item.textContent = `Ensayo ID ${e.id}: ${e.asignatura} - ${e.cantidad_preguntas} preguntas`;
        list.appendChild(item);
      });
    });
}

loadEnsayos();