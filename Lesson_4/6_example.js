import inquirer from 'inquirer'

inquirer
    .prompt({
        name: 'fileName',
        type: 'list',
        message: 'Choose file',
        choices: ['file_a', 'file_b', 'file_c', 'file_d']
    })
    .then(({fileName}) => console.log(fileName))