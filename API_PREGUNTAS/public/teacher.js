// Dummy data for testing
const students = [
  { name: "Ana González", subjects: [ { name: "Matemáticas", average: 4.8 }, { name: "Ciencias", average: 3.9 } ] },
  { name: "Carlos Pérez", subjects: [ { name: "Lenguaje", average: 4.5 }, { name: "Historia", average: 3.2 } ] },
  { name: "Lucía Rojas", subjects: [ { name: "Lenguaje", average: 4.2 } ] },
  { name: "Diego Herrera", subjects: [ { name: "Historia", average: 5.0 } ] },
  { name: "Isabella Ramírez", subjects: [ { name: "Matemáticas", average: 4.1 } ] },
  { name: "Mateo Castillo", subjects: [ { name: "Ciencias", average: 3.5 } ] },
  { name: "Valentina López", subjects: [ { name: "Lenguaje", average: 4.9 } ] },
  { name: "Joaquín Torres", subjects: [ { name: "Historia", average: 2.9 } ] },
  { name: "Tomás Muñoz", subjects: [] } // <-- elev uten fag
];

const tableBody = document.getElementById('reporte-body');
const nameInput = document.getElementById('filter-name');
const subjectInput = document.getElementById('filter-subject');

// Calculates the average of subjects or returns "Sin datos" if no subjects are present
function calculateAverage(subjects) {
  if (!subjects || subjects.length === 0) return "Sin datos";
  const total = subjects.reduce((sum, subj) => sum + subj.average, 0);
  return (total / subjects.length).toFixed(1);
}

// Creates the main table with student data
function renderTable(data) {
  tableBody.innerHTML = "";
  if (data.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 3;
    cell.textContent = "No results found.";
    cell.style.textAlign = "center";
    row.appendChild(cell);
    tableBody.appendChild(row);
    return;
  }

  // Sort the data by name
  data.forEach((student, index) => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = student.name;

    const avgCell = document.createElement("td");
    avgCell.textContent = calculateAverage(student.subjects);

    const toggleCell = document.createElement("td");
    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = "Ver más";
    toggleBtn.className = "toggle-btn";
    toggleBtn.addEventListener("click", () => {
      const detailRow = document.getElementById(`details-${index}`);
      detailRow.classList.toggle("hidden");
    });

    toggleCell.appendChild(toggleBtn);
    row.appendChild(nameCell);
    row.appendChild(avgCell);
    row.appendChild(toggleCell);
    tableBody.appendChild(row);

    // Detail row for subjects
    const detailRow = document.createElement("tr");
    detailRow.id = `details-${index}`;
    detailRow.classList.add("hidden");

    const detailCell = document.createElement("td");
    detailCell.colSpan = 3;

    if (student.subjects.length === 0) {
      detailCell.innerHTML = "<em>Sin datos de asignaturas</em>";
    } else {
      const detailTable = document.createElement("table");
      detailTable.className = "inner-table";

      const headerRow = document.createElement("tr");
      ["Asignatura", "Promedio"].forEach(h => {
        const th = document.createElement("th");
        th.textContent = h;
        headerRow.appendChild(th);
      });
      detailTable.appendChild(headerRow);

      student.subjects.forEach(s => {
        const sRow = document.createElement("tr");
        const subjectCell = document.createElement("td");
        subjectCell.textContent = s.name || "Sin datos";
        const averageCell = document.createElement("td");
        averageCell.textContent = typeof s.average === "number" ? s.average.toFixed(1) : "Sin datos";
        sRow.appendChild(subjectCell);
        sRow.appendChild(averageCell);
        detailTable.appendChild(sRow);
      });

      detailCell.appendChild(detailTable);
    }

    detailRow.appendChild(detailCell);
    tableBody.appendChild(detailRow);
  });
}

// Filter on name and subject
function filterStudents() {
  const name = nameInput.value.toLowerCase();
  const subject = subjectInput.value.toLowerCase();

  const filtered = students.filter(student =>
    student.name.toLowerCase().includes(name) &&
    student.subjects.some(s => (s.name || "").toLowerCase().includes(subject))
  );

  renderTable(filtered);
}

nameInput.addEventListener("input", filterStudents);
subjectInput.addEventListener("input", filterStudents);

// Init-load
renderTable(students);
