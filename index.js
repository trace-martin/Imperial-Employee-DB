const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lookhere',
  database: 'employee_db'
});

const displayMainMenu = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'begin',
        message: 'Please select an option:',
        choices: [
          { name: 'View all Employees', value: 'view_employees' },
          { name: 'Add Employee', value: 'add_employee' },
          { name: 'Remove Employee', value: 'remove_employee' },
          { name: 'View all Departments', value: 'view_departments' },
          { name: 'Add Department', value: 'add_department' },
          { name: 'Remove Department', value: 'remove_department' },
          { name: 'View all Managers', value: 'view_managers' },
          { name: 'Add Manager', value: 'add_manager' },
          { name: 'View all Roles', value: 'view_roles' },
          { name: 'Add Role', value: 'add_role' },
          { name: 'Exit', value: 'exit' },
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
        case 'add_role':
            addRole();
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

});

const allEmployees = () => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) {
      console.error('Error retrieving employees: ', err);
    } else {
      console.table(results);
    }
    displayMainMenu();
  });
};

const addEmployee = () => {
    inquirer
      .prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "Enter the employee's first name:",
          },
          {
            type: 'input',
            name: 'lastName',
            message: "Enter the employee's last name:",
          },
          {
            type: 'list',
            name: 'role',
            message: "Please refer to the Imperial Handbook for role ID's:",
            choices: [
              { name: 'Emperor', value: '1' },
              { name: 'Dark Council', value: '2' },
              { name: 'Sith Militant', value: '3' },
              { name: 'Sith Legal Team', value: '4' },
              { name: 'Sith Accounting', value: '5' },
            ],
          },
          {
            type: 'input',
            name: 'manager',
            message: "Enter the employee's manager:",
          },
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
        displayMainMenu();
      })
      .catch((err) => {
        console.log('Error:', err);
        displayMainMenu();
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
  
  const allRoles = () => {
    db.query('SELECT * FROM role', (err, results) => {
      if (err) {
        console.error('Error retrieving roles: ', err);
      } else {
        console.table(results);
      }
      displayMainMenu();
    });
  };

  const addRole = () => {
    inquirer
      .prompt([
        {
            type: 'input',
            name: 'roleName',
            message: "What will the name of the role be:",
          },
          {
            type: 'input',
            name: 'salary',
            message: "What will the salary for the role be:",
          },
          {
            type: 'list',
            name: 'depRole',
            message: "Which department will the role be associated with:",
            choices: [
                { name: 'Imperial Leadership', value: '1' },
                { name: 'Imperial Legal Team', value: '2' },
                { name: 'Imperial Blaster Fodder', value: '3' },
                { name: 'Imperial Finance', value: '4' }
            ],
          },
      ])
      .then((answers) => {
        const { roleName, salary, depRole} = answers;
        return new Promise((resolve, reject) => {
          db.query(
            'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
            [roleName, salary, depRole],
            (err) => {
              if (err) {
                console.log('Error adding role:', err);
                reject();
              } else {
                console.log('Role added successfully!');
                resolve();
              }
            }
          );
        });
      })
      .then(() => {
        displayMainMenu();
      })
      .catch((err) => {
        console.log('Error:', err);
        displayMainMenu();
      });
  };


  const exit = () => {
    db.end();
    process.exit();
  };