const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

// connection with the db
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lookhere',
  database: 'employee_db'
});

// start of app
const displayMainMenu = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'begin',
        message: 'Please select an option:',
        choices: [
            { name: 'View all Departments', value: 'view_departments' },
            { name: 'View all Roles', value: 'view_roles' },
          { name: 'View all Employees', value: 'view_employees' },
          { name: 'Add Department', value: 'add_department' },
          { name: 'Add Role', value: 'add_role' },
          { name: 'Add Employee', value: 'add_employee' },
          { name: 'Update Employee Role', value: 'update_employee_role' },
        //   { name: 'Remove Employee', value: 'remove_employee' },
        //   { name: 'Remove Department', value: 'remove_department' },
        //   { name: 'View all Managers', value: 'view_managers' },
        //   { name: 'Add Manager', value: 'add_manager' },
          { name: 'Exit', value: 'exit' },
        ],
      },
    ])
    .then((answers) => {
        const choice = answers.begin;
        
    switch (choice) {
        case 'view_departments':
            allDepartments();
            break;
        case 'view_roles':
            allRoles();
            break;
        case 'view_employees':
            allEmployees();
            break;
        case 'add_department':
            addDepartment();
            break;
        case 'add_role':
            addRole();
            break;
        case 'add_employee':
            addEmployee();
            break;
        case 'update_employee_role':
            updateRole();
            break;
        // case 'remove_employee':
        //     removeEmployee();
        //     break;
        // case 'remove_department':
        //     removeDepartment();
        //     break;
        // case 'view_managers':
        //     allManagers();
        //     break;
        // case 'add_manager':
        //     addManager();
        //     break;
        case 'exit':
          console.log('Exiting Employee Records');
          exit();
          break;
      }
    });
};

// --------START OF ROLES--------
// VIEW ALL ROLES
const allDepartments = () => {
    db.query('SELECT * FROM departments', (err, results) => {
        if (err) {
        console.error('Error retrieving departments: ', err);
        } else {
        console.table(results);
        }
        displayMainMenu();
    });
};
    
const addDepartment = () => {
    inquirer
        .prompt([
        {
            type: 'input',
            name: 'depName',
            message: "What will the name of the Department be:",
            },
        ])
        .then((answers) => {
        const { depName } = answers;
        return new Promise((resolve, reject) => {
            db.query(
            'INSERT INTO departments (department_name) VALUES (?)',
            [depName],
            (err) => {
                if (err) {
                console.log('Error adding Department:', err);
                reject();
                } else {
                console.log('Department added successfully!');
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
// --------END OF DEPARTMENTS--------


// --------START OF ROLES--------
// VIEW ALL ROLES
const allRoles = () => {
  const query = `
  SELECT
    roles.title AS job_title,
    roles.id AS role_id,
    departments.department_name AS department,
    roles.salary
  FROM roles
  JOIN departments ON roles.department_id = departments.id`;
    
    db.query(query, (err, results) => {
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
// --------END OF ROLES--------

// --------Start of Employee Functions--------
// view all employees 
const allEmployees = () => {
  const query = `
  SELECT 
    employees.id,
    employees.first_name,
    employees.last_name,
    roles.title,
    departments.department_name AS department,
    roles.salary,
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
  FROM employees
  JOIN roles ON employees.role_id = roles.id
  JOIN departments ON roles.department_id = departments.id
  LEFT JOIN employees AS manager ON employees.manager_id = manager.id`;

    db.query(query, (err, results) => {
      if (err) {
        console.error('Error retrieving employees from DB:', err);
      } else {
        console.table(results)
      }
      displayMainMenu();
    });
};

// --------PROMPTS FOR NEW EMPLOYEE--------
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
    //   --------INSERTION OF NEW EMPLOYEE WITH ANSWERS FROM PROMPTS--------
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
    //   --------RETURNS TO MAIN MENU IN TERMINAL--------
      .then(() => {
        displayMainMenu();
      })
      .catch((err) => {
        console.log('Error:', err);
        displayMainMenu();
      });
};
// --------END OF EMPLOYEE FUNCTIONS--------

// --------START OF UPDATE ROLE--------
const updateRole = async () => {
    try {
      const employeeChoices = await getEmployeeChoices();
      const roleChoices = await getRoleChoices();
  
      console.log(consoleTable.getTable(await getEmployees()));
  
      const choices = [
        ...employeeChoices,
        { name: 'Return to Main Menu', value: 'return' }
      ];

      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'employee',
          message: 'Please select the employee you wish to update:',
          choices: choices
        }
    ]);
    
    if (answers.employee == 'return'){
        displayMainMenu();
        return;
    }

    const { employee } = answers;

    const roleAnswers = await inquirer.prompt([
        {
          type: 'list',
          name: 'newRole',
          message: 'Please select the new role for the employee:',
          choices: roleChoices,
        },
      ]);
  
  
      const { newRole } = roleAnswers;
  
      await updateEmployeeRole(employee, newRole);
  
      console.log("Employee's role has been updated!");
      displayMainMenu();
    } catch (error) {
      console.log('Error:', error);
      displayMainMenu();
    }
};


const getEmployeeChoices = () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT id, CONCAT(first_name, " ", last_name) AS name FROM employees', (err, results) => {
        if (err) {
          reject(err);
        } else {
          const choices = results.map((employee) => ({
            value: employee.id,
            name: employee.name,
          }));
          resolve(choices);
        }
      });
    });
};
  
const getRoleChoices = () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT id, title FROM roles', (err, results) => {
        if (err) {
          reject(err);
        } else {
          const choices = results.map((role) => ({
            value: role.id,
            name: role.title,
          }));
          resolve(choices);
        }
      });
    });
};
  
const getEmployees = () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM employees', (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
};
  
const updateEmployeeRole = (employeeId, newRoleId) => {
    return new Promise((resolve, reject) => {
      db.query('UPDATE employees SET role_id = ? WHERE id = ?', [newRoleId, employeeId], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
};
// --------END OF UPDATE ROLE--------


// --------CONNECTION TO DB--------
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ', err);
        return;
    }
    console.log('Employee DB connected');
    displayMainMenu();
});


const back = () => {
    displayMainMenu()
};
// EXIT FUNC
const exit = () => {
db.end();
process.exit();
};