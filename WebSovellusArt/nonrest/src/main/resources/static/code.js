const employeeTable = document.getElementById('employee-table');
const showAllEmployeesButton = document.getElementById('show-all-employees');

fetch('/employees')
  .then(response => response.json())
  .then(data => {
    console.log(data); // log the data to the console
    const employeeTable = document.getElementById('employee-table');
    data.forEach(employee => {
      const row = employeeTable.insertRow();
      row.insertCell().textContent = employee.id;
      row.insertCell().textContent = employee.name;
      row.insertCell().textContent = employee.role;
    });
  })
  .catch(error => {
    console.error('Error fetching employee data:', error);
  });

  showAllEmployeesButton.addEventListener('click', () => {
    fetch('http://localhost:8080/employees')
      .then(response => response.json())
      .then(data => {
        const employeeTable = document.getElementById('employee-table');
        employeeTable.innerHTML = `
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        `;
        data.forEach(employee => {
          const row = employeeTable.insertRow();
          row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.role}</td>
          `;
        });
      })
      .catch(error => {
        console.error('Error fetching employee data:', error);
      });
  });
  

// Handle form submission to add a new employee
const addEmployeeForm = document.getElementById('add-employee-form');
addEmployeeForm.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(addEmployeeForm);
  const employee = {
    id: formData.get('id'),
    name: formData.get('name'),
    role: formData.get('role')
  };
  const messageElement = document.getElementById('message');
  messageElement.textContent = 'Sending data...';
  fetch('/employees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employee)
  })
  .then(response => response.json())
  .then(newEmployee => {
    messageElement.textContent = 'Data sent successfully. Restarting in 5 seconds...';
    let countdown = 5;
    const countdownInterval = setInterval(() => {
      messageElement.textContent = `Data sent successfully. Restarting in ${countdown} seconds...`;
      countdown--;
      if (countdown < 0) {
        clearInterval(countdownInterval);
        window.location.reload(); // restart the page
      }
    }, 1000);
    const row = employeeTable.insertRow();
    row.insertCell().textContent = newEmployee.id;
    row.insertCell().textContent = newEmployee.name;
    row.insertCell().textContent = newEmployee.role;
    addEmployeeForm.reset();
  })
  .catch(error => {
    messageElement.textContent = 'Error adding employee. Please try again.';
    console.error('Error adding employee:', error);
  });
});


// Handle form submission to update an employee
const updateEmployeeForm = document.getElementById('update-employee-form');
updateEmployeeForm.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(updateEmployeeForm);
  const employee = {
    id: formData.get('id'),
    name: formData.get('name'),
    role: formData.get('role')
  };
  const url = '/employees/' + employee.id;
  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(employee)
  })
  .then(response => response.json())
  .then(updatedEmployee => {
    // update the employee in the table
    const rows = employeeTable.rows;
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row.cells[0].textContent === updatedEmployee.id.toString()) {
        row.cells[1].textContent = updatedEmployee.name;
        row.cells[2].textContent = updatedEmployee.role;
        break;
      }
    }
    updateEmployeeForm.reset();
  })
  .catch(error => {
    console.error('Error updating employee:', error);
  });
});


  // Handle form submission to delete an employee
  const deleteEmployeeForm = document.getElementById('delete-employee-form');
   deleteEmployeeForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(deleteEmployeeForm);
      const employeeId = formData.get('id');
      const url = '/employees/' + employeeId;
      fetch(url, {
        method: 'DELETE'
      })
      .then(() => {
        // remove the employee from the table
        const rows = employeeTable.rows;
        for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          if (row.cells[0].textContent === employeeId.toString()) {
            employeeTable.deleteRow(i);
            break;
          }
        }
        deleteEmployeeForm.reset();
      })
      .catch(error => {
        console.error('Error deleting employee:', error);
      });
    });

// Function to render the employee table
function renderEmployeeTable(employees) {
  employeeTable.innerHTML = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      ${employees.map(employee => `
        <tr data-id="${employee.id}">
          <td>${employee.id}</td>
          <td>${employee.name}</td>
          <td>${employee.role}</td>
          <td>
            <button class="update-employee-button" data-id="${employee.id}">Update</button>
            <button class="delete-employee-button" data-id="${employee.id}">Delete</button>
          </td>
        </tr>
      `).join('')}
    </tbody>
  `;
}

// Function to handle update employee button click
function handleUpdateEmployeeButtonClick(event) {
  const id = event.target.getAttribute('data-id');
  const name = prompt('Enter employee name:');
  const role = prompt('Enter employee role:');
  if (name && role) {
    updateEmployeeProfile(id, name, role);
  }
}

// Function to handle delete employee button click
function handleDeleteEmployeeButtonClick(event) {
  const id = event.target.getAttribute('data-id');
  deleteEmployee(id);
}

// Add event listeners to update and delete buttons
employeeTable.addEventListener('click', event => {
  if (event.target.classList.contains('update-employee-button')) {
    handleUpdateEmployeeButtonClick(event);
  } else if (event.target.classList.contains('delete-employee-button')) {
    handleDeleteEmployeeButtonClick(event);
  }
});

// Function to render the employee table
function renderEmployeeTable(employees) {
  employeeTable.innerHTML = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Role</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      ${employees.map(employee => `
        <tr data-id="${employee.id}">
          <td>${employee.id}</td>
          <td>${employee.name}</td>
          <td>${employee.role}</td>
          <td>
            <button class="update-employee-button" data-id="${employee.id}">Update</button>
            <button class="delete-employee-button" data-id="${employee.id}">Delete</button>
          </td>
        </tr>
      `).join('')}
    </tbody>
  `;
}


