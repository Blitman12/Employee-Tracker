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

async function getData() {
    return fetch(`http://localhost:3001/api/department`).then((response) => {
        if (response.ok) {
            return response.json()
        } else {
            throw new Error('Something went wrong')
        }
    })
}

const getInfo = async (data) => {
    return fetch('http://localhost:3001/api/role', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
}

const formateAnswers = async (answers, data) => {
    let finalAnswers = {};
    for (let i = 0; i < data.data.length; i++) {
        if (answers.department_id === data.data[i].department_name) {
            console.log(answers.department_id)
            console.log(data.data[i].department_name)
            finalAnswers = {title: answers.title, salary: answers.salary, department_id: data.data[i].id}
        }
    }
    return finalAnswers;
}

async function askQuestions() {
    const data = await getData();
    const questions = await generateQuestions(data);
    const answers = await inquirer.prompt(questions);
    const formatedAnswers = await formateAnswers(answers, data);
    const setRole = await getInfo(formatedAnswers);
}


const generateQuestions = async data => {
    const departments = data.data;
    const departmentTitle = [];
    departments.forEach(department => {
        departmentTitle.push(department.department_name)
    })
    return questionsArray =[
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
            type: 'list',
            name: 'department_id',
            message: 'What department does this role belong too?',
            choices: departmentTitle
        }
    ];
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

module.exports = { updateRole, addEmployee, addDepartment, getAll, askQuestions };