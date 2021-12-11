function loadStudents() {
    const studentsTable = document.querySelector('#results tbody');
    fetch('http://localhost:3030/jsonstore/collections/students')
        .then(response => {
            if (!response.ok) {
                response.text().then(errorText => { throw new Error(errorText) });
            } else {
                return response.json();
            };
        }).then(students => {
            studentsTable.innerHTML = '';
            Object.values(students).forEach(student => {
                const tr = document.createElement('tr');
                tr.innerHTML = `<th>${student.firstName}</th><th>${student.lastName}</th><th>${student.facultyNumber}</th><th>${student.grade.toFixed(2)}</th>`;
                studentsTable.appendChild(tr);
            });
        }).catch(error => alert(error.message));
}

function createStudent(form, event) {
    event.preventDefault();
    const formData = new FormData(form);
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const facultyNumber = formData.get('facultyNumber');
    const grade = formData.get('grade');

    if (!firstName || !lastName || !facultyNumber || !grade) {
        return alert('All fields are required');
    }
    if (isNaN(facultyNumber) || !Number.isInteger(Number(facultyNumber)) || Number(facultyNumber) < 0) {
        return alert('Faculty number shoul be a positive integer number!');
    }
    if (isNaN(grade)) {
        return alert('Grade shoul be a number');
    }
    if(Number(grade) < 2 || Number(grade) > 6) {
        return alert('Grade should be between 2.00 and 6.00');
    }
    const data = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        facultyNumber: facultyNumber.toString(),
        grade: Number(grade)
    }
    fetch('http://localhost:3030/jsonstore/collections/students', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(response => {
        if (!response.ok) {
            response.text().then(errorText => { throw new Error(errorText); });
        } else {
            return response.json();
        }
    }).then(() => {
        loadStudents();
        form.reset();
    }).catch(error => alert(error.message));
}

function attachEvents() {
    const form = document.querySelector('form');
    form.addEventListener('submit', createStudent.bind(this, form));
}

attachEvents();
window.addEventListener('load', loadStudents);