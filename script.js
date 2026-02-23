let students = JSON.parse(localStorage.getItem("students")) || [];

function saveData() {
  localStorage.setItem("students", JSON.stringify(students));
}

function addStudent() {
  let nameInput = document.getElementById("studentName");
  let name = nameInput.value.trim();

  if (name === "") {
    alert("Please enter student name");
    return;
  }

  students.push({
    name: name,
    present: 0,
    absent: 0
  });

  nameInput.value = "";
  saveData();
  displayStudents();
}

function markPresent(index) {
  students[index].present++;
  saveData();
  displayStudents();
}

function markAbsent(index) {
  students[index].absent++;
  saveData();
  displayStudents();
}

function deleteStudent(index) {
  students.splice(index, 1);
  saveData();
  displayStudents();
}

function displayStudents() {
  let table = document.getElementById("studentTable");
  table.innerHTML = "";

  students.forEach((student, index) => {
    let total = student.present + student.absent;
    let percentage = total === 0
      ? 0
      : ((student.present / total) * 100).toFixed(1);

    let row = `
      <tr>
        <td>${student.name}</td>
        <td>${student.present}</td>
        <td>${student.absent}</td>
        <td>${total}</td>
        <td>${percentage}%</td>
        <td>
          <button class="present" onclick="markPresent(${index})">P</button>
          <button class="absent" onclick="markAbsent(${index})">A</button>
          <button class="delete" onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;

    table.innerHTML += row;
  });
}

displayStudents();
