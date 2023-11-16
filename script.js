const variant = 8;
const onBlur = (inputElement) => {
  const pattern = inputElement.getAttribute('pattern');
  if (pattern) {
    const regex = new RegExp(`^${pattern}$`);

    if (!regex.test(inputElement.value)) {
      hasErrors = true;
      inputElement.style.borderColor = "red";
    }
    else{
      inputElement.style.borderColor = "black";

    }
  }
}
function submitForm(event) {
  event.preventDefault();
  const form = document.getElementById('registrationForm');
  const formData = new FormData(form);

  let hasErrors = false;

  formData.forEach((_, key) => {
    const inputElement = form.elements[key];
    onBlur(inputElement);

  });

  const resultContainer = document.getElementById('resultContainer');

  if (!hasErrors) {

    let resultString = '<h2>Form Result:</h2><ul>';
    formData.forEach((value, key) => {
      resultString += `<li><strong>${key}:</strong> ${value}</li>`;
    });
    resultString += '</ul>';

    resultContainer.innerHTML = resultString;
    resultContainer.style.display = "block";
  }
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function handleCellEvents(event) {
  const cell = event.target;

  if (cell.value === variant) {
    cell.style.backgroundColor = getRandomColor();

    cell.onclick = () => {
      const currentColor = document.getElementById('currentColor');
      cell.style.backgroundColor = currentColor.value;
    };
    cell.ondblclick = () => {
      const columnIndex = cell.cellIndex;
      const rows = cell.parentElement.parentElement.rows;
      const cells = rows[0].cells; // № of cells in a row
      for (let i = columnIndex; i < cells.length; i += 2) {

        for (let j = 0; j < rows.length; j++) {
          const targetCell = rows[j].cells[i];
          targetCell.style.backgroundColor = currentColor.value;
        }
      }
    };
  }
}

const table = document.getElementById('colorfulTable');
for (let i = 1; i <= 6; i++) {
  const row = table.insertRow();
  for (let j = 1; j <= 6; j++) {
    const cell = row.insertCell();
    const cellNumber = (i - 1) * 6 + j;
    cell.textContent = cellNumber;
    cell.value = cellNumber;

    cell.onmouseover = handleCellEvents;
  }
}
