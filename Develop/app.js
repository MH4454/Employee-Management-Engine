const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { inherits } = require("util");
const teamMates = []

function employeeQuestionPrompt(){
    return inquirer.prompt([
        {
            type: 'input',
            message: 'What is the employee name?',
            name: 'name',
        },
        {
            type: 'input',
            message: 'What is the employee identification number?',
            name: 'id',
        },
        {
            type: 'input',
            message: 'What is the employee e-mail address',
            name: 'email',
        },
        {
            type: 'list',
            message: 'What is the employee role?',
            name: 'role',
            choices: ['Intern', 'Engineer', 'Manager']
        },
        {
            type: 'input',
            message: 'What is the employee school name?',
            name: 'school',
            when: function (answers) {
                return answers.role === 'Intern'
            }
        },
        {
            type: 'input',
            message: 'What is the employee Github username?',
            name: 'github',
            when: function (answers) {
                return answers.role === 'Engineer'
            }
        },
        {
            type: 'input',
            message: 'What is the employee office number?',
            name: 'officeNumber',
            when: function (answers) {
                return answers.role === 'Manager'
            }
        },
        {
            type: 'confirm',
            message: 'Do you want to add another employee?',
            name: 'w4',
            default: 'Y'
        }
    ])
};

function init() {
    employeeQuestionPrompt().then((userData) => {
        if (userData.role === 'Intern') {
            const newInt = new Intern (userData.name, userData.id, userData.email, userData.school, userData.role);
            teamMates.push(newInt);
            console.log('Adding new Intern!')
        }
        else if (userData.role === 'Engineer') {
            const newEng = new Engineer (userData.name, userData.id, userData.email, userData.github, userData.role);
            teamMates.push(newEng);
            console.log('Adding new Engineer!')
        }
        else if (userData.role === 'Manager') {
            const newMan = new Manager (userData.name, userData.id, userData.email, userData.officeNumber, userData.role);
            teamMates.push(newMan);
            console.log('Adding new Manager!')
        }
        else {
            throw console.error("Please enter a valid role");
        }
        if (userData.w4 === true) {
            init()
        }
        else {
            console.log('Generating team')
            const renderedTeamMates = render(teamMates);
            fs.writeFileSync(outputPath, renderedTeamMates, {}, (err) =>
             err ? console.log(err) : console.log("Team generated"))
        };
    })
};
init();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
