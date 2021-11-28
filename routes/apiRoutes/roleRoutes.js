const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const cTable = require('console.table');

router.get('/role', (req, res) => {
    const sql = 'SELECT title, salary, department_id, department.name AS department FROM role LEFT JOIN department ON role.department_id = department.id ORDER BY department_id';

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message})
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