import fs from 'fs'
import inquirer from 'inquirer'
import yargs from "yargs"
import {hideBin} from 'yargs/helpers'
import {Transform} from 'stream'

export const isFile = (filePath) => {
    return fs.lstatSync(filePath).isFile()
}

export const getFileNamesInDirectory = async (directory) => {
    return await new Promise((resolve) => {
        fs.readdir(directory, (err, data) => {
            if (directory !== '/') {
                data.unshift('..')
            }
            resolve(data)
        })
    })
}

export const promptUser = async (choices) => {
    const optionKey = 'optionKey'
    const result = await inquirer.prompt([{
        name: optionKey,
        type: 'list',
        message: 'Please choose a file',
        choices
    }])
    return result[optionKey]
}

export const yargsConf = () => {
    return yargs(hideBin(process.argv))
        .usage("Usage: -p <path>")
        .options('p', {
            alias: 'path',
            describe: 'Path to file',
            type: 'string',
            demandOption: true
        })
        .options('s', {
            alias: 'search',
            describe: 'Search string in file',
            type: 'string',
            demandOption: true
        })
        .argv
}

export const transformChunks = (search) => {
    return new Transform({
        transform(chunk, encoding, callback) {
            const transformedChunk = chunk.toString().match(search)
            if (transformedChunk?.length) {
                transformedChunk.forEach(line => {
                    this.push(`| ${line.trim()} \n | ------------------------------- \n`)
                })
            }
            callback()
        }
    })
}