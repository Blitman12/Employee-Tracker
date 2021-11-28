const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const cTable = require('console.table');

// Get all departments
router.get('/department', (req, res) => {
    const sql = 'SELECT id, name AS department_name FROM department'

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

module.exports = router;