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

// const addEmployee = async () => {
//     return inquirer.prompt([
//         {
//             type: 'input',
//             name: 'first_name',
//             message: 'What is the employee`s first name?'
//         }, 
//         {
//             type: 'input',
//             name: 'last_name',
//             message: 'What is the employee`s last name?'
//         },
//         {
//             type: 'number',
//             name: 'role_id',
//             message: 'What is the employee`s role id?'
//         },
//         {
//             type: 'number',
//             name: 'role_id',
//             message: 'What is the employee`s role id?'
//         }
//     ]).then(data => {
//         console.log(data)
//         fetch('http://localhost:3001/api/employee', {
//             method: 'POST',
//             headers: {
//                 Accept: 'application/json',
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(data)
//         })
//     })
// }

// Inquirer functionality
const promptQuestions = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'optionsList',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add an employee', 'Update an employees roles']
        }
    ]).then(async answer => {
        const selectedOption = answer.optionsList;

        switch (selectedOption) {
            case 'View all departments':
                await getAll('department');
                break;
            case 'View all roles':
                await getAll('role');
                break;
            case 'View all employees':
                await getAll('employee')
                break;
            case 'Add a department':
                await addDepartment();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employees roles':
                updateRole();
                break;
            default:
                console.log('Something went wrong, We are sorry')
        }
        promptQuestions()
    })
}

promptQuestions()