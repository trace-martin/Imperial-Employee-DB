INSERT INTO departments (department_name)
VALUES  ("Imperial Leadership"),
        ("Imperial Legal Team"),
        ("Imperial Blaster Fodder"),
        ("Imperial Finance");
       
INSERT INTO role (title, salary, department_id)
VALUES ("Emperor", 1000000000, 1),
       ("Dark Council", 5000000, 1),
       ("Sith Militant", 750, 3),
       ("Sith Legal Team", 2000000, 2),
       ("Sith Accounting", 70000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Darth", "Sidious", 1, 1),
       ("Darth", "Vadar", 2, 1),
       ("Mass", "Amedda", 2, 1),
       ("Sate", "Pestage", 2, 1),
       ("Janus", "Greejatus", 4, 1),
       ("Ars", "Dangor", 4, 2),
       ("Darth", "Bane", 4, 2),
       ("Darth", "Maul", 3, 1),
       ("Razz", "Taral", 3, 2),
       ("Subject", "1138", 3, 2),
       ("Vergere", "Castle", 4, 2),
       ("Galen", "Marek", 3, 2);