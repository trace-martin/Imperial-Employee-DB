const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lookhere',
  database: 'employee_db'
});

const start = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'begin',
        message: 'Please select an option:',
        choices: [
          { key: 'v', name: 'View all Employees', value: 'view_employees' },
          { key: 'a', name: 'Add Employee', value: 'add_employee' },
          { key: 'r', name: 'Remove Employee', value: 'remove_employee' },
          { key: 'd', name: 'View all Departments', value: 'view_departments' },
          { key: 'ad', name: 'Add Department', value: 'add_department' },
          { key: 'rd', name: 'Remove Department', value: 'remove_department' },
          { key: 'vm', name: 'View all Managers', value: 'view_managers' },
          { key: 'am', name: 'Add Manager', value: 'add_manager' },
          { key: 'vr', name: 'View all Roles', value: 'view_roles' },
          { key: 'e', name: 'Exit', value: 'exit' },
        ],
      },
    ])
    .then((answers) => {
      const choice = answers.begin;

      switch (choice) {
        case 'view_employees':
          allEmployees();
          break;
        case 'add_employee':
          addEmployee();
          break;
        case 'remove_employee':
          removeEmployee();
          break;
        case 'view_departments':
          allDepartments();
          break;
        case 'add_department':
          addDepartment();
          break;
        case 'remove_department':
          removeDepartment();
          break;
        case 'view_managers':
          allManagers();
          break;
        case 'add_manager':
          addManager();
          break;
        case 'view_roles':
          allRoles();
          break;
        case 'exit':
          console.log('Exiting Employee Records');
          exit();
          break;
      }
    });
};

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Employee DB connected');
  start();
});

const allEmployees = () => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) {
      console.error('Error retrieving employees: ', err);
    } else {
      console.table(results);
    }
    start();
  });
};

const addEmployee = () => {
    inquirer
      .prompt([
        // Prompt questions here
      ])
      .then((answers) => {
        const { firstName, lastName, role, manager } = answers;
        return new Promise((resolve, reject) => {
          db.query(
            'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
            [firstName, lastName, role, manager],
            (err) => {
              if (err) {
                console.log('Error adding employee:', err);
                reject();
              } else {
                console.log('Employee added successfully!');
                resolve();
              }
            }
          );
        });
      })
      .then(() => {
        displayMainMenu(); // After adding an employee, display the main menu again
      })
      .catch((err) => {
        console.log('Error:', err);
        displayMainMenu(); // Handle error by displaying the main menu again
      });
  };
  
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database: ', err);
      return;
    }
    console.log('Employee DB connected');
    displayMainMenu(); // Start the program by displaying the main menu
  });
  
  const exit = () => {
    db.end();
    process.exit();
  };