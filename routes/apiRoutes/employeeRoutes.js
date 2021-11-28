const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const cTable = require('console.table');

router.get('/employee', (req, res) => {
    const sql = 'SELECT t_original.employee_id, t_original.first_name, t_original.last_name, t_original.title, t_original.department, t_original.salary, t_mgrs.manager FROM (SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id) t_original JOIN (SELECT t_emp.id, t_emp.first_name, CONCAT(t_mgr.first_name, " ", t_mgr.last_name) AS manager FROM employee t_emp LEFT JOIN employee t_mgr ON t_emp.manager_id = t_mgr.id) t_mgrs ON t_original.employee_id = t_mgrs.id';

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message })
            return;
        }
        res.json({
            message: 'success',
            data: rows
        })
        console.table('Role Information', rows)
    })
})

module.exports = router;