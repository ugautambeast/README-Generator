const inquirer = require("inquirer");
const fs = require('fs');
let path = './README.md';
let $template = "";

try {
  // Checks if README.md exists
  if (fs.existsSync(path)) {
    inquirer
      .prompt([
        {
          type: "list",
          message: "Overwrite existing README.md?",
          name: "overwrite",
          choices: ["yes", "no", "cancel"]
        }])
      .then(function (response) {
        if (response.overwrite === "no") {
          path = './README-1.md';
          getInfo();
        } else if (response.overwrite === "yes") {
          getInfo();
        };
      })
  } else { getInfo(); }
} catch (err) {
  console.error(err);
}

// Creates inquirer questions
function getInfo() {
  inquirer
    .prompt([
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
    ])
    // Receives response from questions
    .then(function (response) {
      // Creates the template for the readme
      let licenceInfo = "";
      $template += `# ${response.name}\n\n`;
      if (response.licence === "MIT") {
        $template += `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)\n\n`;
        licenceInfo = '(https://opensource.org/licenses/MIT)\n\nYou have the freedom to do as you like with this permissive software, as long as an original copy and license notice is included. I cannon be held liable for this software.\n\n';
      }
    
      $template += `### Table of Contents\n\n- [Description](#description)\n- [Installation](#installation)\n- [Usage](#usage)\n- [Contributing](#contributing)\n- [Testing](#testing)\n- [Questions](#questions)\n- [License](#license)\n- [Application Image](#application-image)\n\n`;
      $template += `## Description\n\n${response.description}\n\n`;
      $template += `## Installation\n\n${response.install}\n\n`;
      $template += `## Usage\n\n${response.usage}\n\n`;
      $template += `## Contributing\n\n${response.contribute}\n\n`;
      $template += `## Questions\n\nIf you have any questions feel free to contact me here:\n\n ##### Github: [github.com/${response.username}](https://github.com/${response.username})\n\n ##### Email: [${response.email}](mailto:${response.email}?subject=[GitHub])\n\n`;
      $template += `## Testing\n\n[${response.test}]\n\n`;
      $template += `## License\n\n[${response.licence}]${licenceInfo}`;
      $template += `## Application Image\n\n ![Image of Application](${response.image})`;
      // Writes the created template to README.md file
      fs.writeFile(path, $template, function (err) {
        if (err) {
          console.log(err);
        }
      });
    });

}