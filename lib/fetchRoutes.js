const inquirer = require('inquirer')
const cTable = require('console.table');
const fetch = require('cross-fetch')


const getAll = (parameter) => {
    return fetch(`http://localhost:3001/api/${parameter}`).then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Something went wrong')
        }
    })
        .then(data => {
            console.table(`${parameter}'s`, data.data)
        })
        .catch(error => {
            console.log(error)
        })
}

const addDepartment = async () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the department name?'
        }
    ]).then(data => {
        fetch('http://localhost:3001/api/department', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    })
}

const addEmployee = async () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the employee`s first name?'
        }, 
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employee`s last name?'
        },
        {
            type: 'number',
            name: 'role_id',
            message: 'What is the employee`s role id?'
        },
        {
            type: 'number',
            name: 'manager_id',
            message: 'What is the employee`s manager id, if they are a manager leave blank?'
        }
    ]).then(data => {
        fetch('http://localhost:3001/api/employee', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    })
}

const addRole = async () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the role name?'
        }, 
        {
            type: 'number',
            name: 'salary',
            message: 'What is the salary?'
        },
        {
            type: 'number',
            name: 'department_id',
            message: 'What department does the role belong too?'
        }
    ]).then(data => {
        fetch('http://localhost:3001/api/role', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    })
}

const updateRole = async () => {
    return inquirer.prompt([
        {
            type: 'number',
            name: 'id',
            message: 'What is the ID# of the employee you wish to update?'
        }, 
        {
            type: 'number',
            name: 'role_id',
            message: 'What is role ID# of the role the employee will change too?'
        }
    ]).then(data => {
        console.log(data)
        fetch(`http://localhost:3001/api/employee/${data.id}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    })
}

module.exports = {updateRole, addRole, addEmployee, addDepartment, getAll};