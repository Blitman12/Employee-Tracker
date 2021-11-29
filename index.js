const inquirer = require('inquirer')
const cTable = require('console.table');
const fetch = require('cross-fetch')
const {updateRole, addRole, addEmployee, addDepartment, getAll} = require('./lib/fetchRoutes');


// Inquirer functionality
const promptQuestions = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'optionsList',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role','Add an employee', 'Update an employees roles']
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
                await addEmployee();
                break;
            case 'Add a role':
                await addRole();
                break;
            case 'Update an employees roles':
                await updateRole();
                break;
            default:
                console.log('Something went wrong, We are sorry')
        }
        promptQuestions()
    })
}

promptQuestions()