// const inquirer = require('inquirer');
// const mysql = require('mysql2');
// const consoleTable = require('console.table');

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'lookhere',
//     database: 'employee_db'
//     },
//     console.log('Employee DB connected')
// );


// db.connect((err) => {
//     if (err) throw err;
//     start()
// });

// const start = () =>{
//     inquirer.prompt ([
//         {
//             type: 'list',
//             name: 'begin',
//             message: "Please select an option:",
//             choices: [
//                 'View all Employees',
//                 'Add Employee',
//                 'Remove Emlpoyee',
//                 'View all Departments',
//                 'Add Department',
//                 'Remove Department',
//                 'View all Managers',
//                 'Add Manager',
//                 'View all Roles',
//                 'Exit',
//             ],
//         },
//     ])
//     .then((answers) => {
//         const choice = answers.begin;

//         switch(choice) {
//             case 'View all Departments': allDepartments();
//                 break;
//             case 'Add Department': addDepartment();
//                 break;
//             // case 'View all Managers': allManagers();
//             //     break;
//             // case 'Add Manager': addManager();
//             //     break;
//             case 'View all Employees': allEmployees();
//                 break;
//             case 'Add Employees': addEmployee();
//                 break;
//             case 'View all Roles': allRoles();
//                 break;
//             case 'Add a role': addRole();
//             case 'Exit': 
//                 console.log("Exiting Employee Records")
//                 exit();
//                 break;
//         }
//     });
// }

//     start();

// const allDepartments = async () => {
//     await db.query(`SELECT * FROM departments`, (err, res) => {
//         err ? console.log(err) : console.table(res);
//         start();
//     })
// };

// // const allManagers = async () => {
// //     await db.quary(`SELECT * FROM managers`, (err, res) => {
// //         err ? console.log(err) : console.table(res);
// //         init();
// //     })
// // };

// const allEmployees = async () => {
//     await db.quary(`SELECT * FROM employees`, (err, res) => {
//         err ? console.log(err) : console.table(res);
//         init();
//     })
// };

// // may need to add into addRole func
// const departments = () => db.promise().query(`SELECT * FROM department`)
// .then((rows) => {
//     let depName = rows[0].map(obj => obj.name);
//     return depName
// });

// const roleChoice = () => db.promise().query(`SELECT * FROM role`)
// .then((rows) => {
//     let roleName = rows[0].map(obj => obj.name);
//     return roleName
// });


// const addRole = async () => {
//     await input.prompt([
//         {
//             type: 'input',
//             name: 'roleName',
//             message: 'What role will be added to the Empire?',
//         }
//     ])
// }
// const addEmployee = async () => {
//     await input.prompt([
//     {
//         type: 'input',
//         name: 'firstName',
//         message: 'What is their first name?'
//     },
//     {
//         type: 'input',
//         name: 'lastName',
//         message: 'What is their last name?'
//     },
//     {
//         type: 'list',
//         name: 'role',
//         message: 'What will be their role at the Empire?',
//         choices: depRole
//     },
//     {
//         type: 'list',
//         name: 'employeeManager',
//         message: 'Who is their Manager?',
//         choice: managers
//     }
//     ]).then ((answer) => {
//         db.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id)
//         VALUES(?, ?)`, [answer.firstName, answer.lastName, answer.role, answer.employeeManager], (err, res) => {
//             if (err) {
//                 console.log(err)
//             } else {
//                 db.query(`SELECT * FROM employees`)
//             }
//         })
//     })
// };

const inquirer = require('inquirer');
const mysql = require('mysql2/promise');
const consoleTable = require('console.table');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lookhere',
  database: 'employee_db'
});

db.connect((err) => {
  if (err) throw err;
  start();
});

const start = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'begin',
      message: 'Please select an option:',
      choices: [
        'View all Employees',
        'Add Employee',
        'Remove Employee',
        'View all Departments',
        'Add Department',
        'Remove Department',
        'View all Managers',
        'Add Manager',
        'View all Roles',
        'Exit',
      ],
    },
  ]).then((answers) => {
    const choice = answers.begin;

    switch (choice) {
      case 'View all Departments':
        allDepartments();
        break;
      case 'Add Department':
        addDepartment();
        break;
      // case 'View all Managers':
      //     allManagers();
      //     break;
      // case 'Add Manager':
      //     addManager();
      //     break;
      case 'View all Employees':
        allEmployees();
        break;
      case 'Add Employees':
        addEmployee();
        break;
      case 'View all Roles':
        allRoles();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Exit':
        console.log('Exiting Employee Records');
        exit();
        break;
    }
  });
};

start();

const allDepartments = async () => {
    try {
      const [rows] = await db.query('SELECT * FROM departments');
      console.table(rows);
    } catch (err) {
      console.log(err);
    }
    start();
  };

// const allManagers = async () => {
//     await db.query('SELECT * FROM managers', (err, res) => {
//         err ? console.log(err) : console.table(res);
//         start();
//     });
// };

const allEmployees = async () => {
    try {
      const [rows] = await db.query('SELECT * FROM employees');
      console.table(rows);
    } catch (err) {
      console.log(err);
    }
    start();
  };

const departments = () =>
  db.promise()
    .query('SELECT * FROM department')
    .then((rows) => {
      let depName = rows[0].map((obj) => obj.name);
      return depName;
    });

const roleChoice = () =>
  db.promise()
    .query('SELECT * FROM role')
    .then((rows) => {
      let roleName = rows[0].map((obj) => obj.name);
      return roleName;
    });

const addRole = async () => {
    try {
        const answer = await inquirer.prompt([
        {
            type: 'input',
            name: 'roleName',
            message: 'What role will be added to the Empire?',
        }
        ]);
        await db.query('INSERT INTO role(name) VALUES(?)', [answer.roleName]);
        console.log('Role added successfully');
    } catch (err) {
        console.log(err);
    }
    start();
    };

const addEmployee = async () => {
  const depRole = await departments();
  const managers = await managers();

  await inquirer.prompt([
    {
        type: 'input',
        name: 'firstName',
        message: 'What is their first name?'
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'What is their last name?'
      },
      {
        type: 'list',
        name: 'role',
        message: 'What will be their role at the Empire?',
        choices: depRole
      },
      {
        type: 'list',
        name: 'employeeManager',
        message: 'Who is their Manager?',
        choices: managers
      }
    ]).then((answer) => {
      db.query(
        `INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)`,
        [answer.firstName, answer.lastName, answer.role, answer.employeeManager],
        (err, res) => {
          if (err) {
            console.log(err);
          } else {
            console.log('Employee added successfully');
          }
          start();
        }
      );
    });
    };
    
    function exit() {
      process.exit();
    }
    