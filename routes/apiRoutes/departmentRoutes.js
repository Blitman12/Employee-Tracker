const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const cTable = require('console.table');

// Get all departments
router.get('/department', (req, res) => {
    const sql = 'SELECT id, name AS department_name FROM department ORDER BY id ASC'

    db.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message })
            return;
        }
        res.json({
            message: 'success',
            data: rows
        })
        console.table('Department Information', rows)
    })
})

router.post('/department', (req, res) => {
    const sql = 'INSERT INTO department (name) VALUES (?)';
    const params = req.body.name;

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message })
        }
        res.json({
            message: 'success',
            data: req.body
        });
    });
});


module.exports = router;