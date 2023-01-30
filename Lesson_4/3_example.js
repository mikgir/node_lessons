import yargs from "yargs";
import {hideBin} from 'yargs/helpers'
import fs from 'fs'
import path from 'path'

const options = yargs(hideBin(process.argv))
    .usage("Usage: -p <path>")
    .options("p", {
        alias: 'path',
        describe: 'Path to file',
        damandOption: true
    }).argv

console.log(options)

const __dirname = '/mike/node_lessons/lesson_4'

fs.readFile(path.join(__dirname, options.p), 'utf-8', (err, data)=>{
    console.log(data)
})