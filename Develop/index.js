const inquirer = require("inquirer");
const fs = require('fs');
const util = require('util')

const generateMarkdown = require('./utils/generateMarkdown')
const questions = [
  {
    type: "input",
    message: "Enter the name of your project.",
    name: "name"
  },
  {
    type: "input",
    message: "Enter a brief description of your project.",
    name: "description"
  },
  {
    type: "editor",
    message: "Explain the installation instructions.",
    name: "install"
  },
  {
    type: "input",
    message: "Enter the usage information for your project.",
    name: "usage"
  },
  {
    type: "input",
    message: "Can others contribute to this project?",
    name: "contribute"
  },
  {
    type: "input",
    message: "How can this code be tested?",
    name: "test"
  },
  {
    type: "list",
    message: "What licence is relevant to this project?",
    name: "licence",
    choices: ["MIT"]
  },
  {
    type: "input",
    message: "what is your Github username?",
    name: "username"
  },
  {
    type: "input",
    message: "what is your email address?",
    name: "email"
  },
];

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, err => {
    if (err) {
      return console.log(err)
    }
    console.log("successfully created README")
  })
}
const writeFileAsync = util.promisify(writeToFile)

async function init() {
  const input = await inquirer.prompt(questions);
  const useMarkdown = generateMarkdown(input);
}

init();


