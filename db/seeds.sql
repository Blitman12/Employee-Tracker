INSERT INTO department (name)
VALUES
    ('Produce'),
    ('Deli'),
    ('Electronics'),
    ("Warehouse");

INSERT INTO role (title, salary, department_id)
VALUES
    ('Produce Manager', 50000, 1),
    ('Deli Manager', 50000, 2),
    ('Electronics Manager', 50000, 3),
    ('Warehouse Manager', 50000, 4),
    ('Produce Floor Worker', 30000, 1),
    ('Warehouse Floor Worker', 30000, 4);
    

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
    ('Brad', 'Litman', 1, null),
    ('Tyler', 'Litman', 2, null),
    ('Larry', 'Litman', 3, null),
    ('Shawna', 'Litman', 4, null),
    ('Sierra', 'Litman', 5, 1),
    ('Brittany', 'Litman', 5, 2),
    ('Brandon', 'Baily', 6, 3),
    ('Shane', 'Cook', 6, 4);

