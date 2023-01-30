#!/user/bin/env node
import fs from 'fs'
import path from "path"
import EventEmitter from "events"
import {
    getFileNamesInDirectory,
    isFile,
    promptUser,
    transformChunks,
    yargsConf
} from './libs.js'

const hw_4 = ()=>{
    class MyEmitter extends EventEmitter {}

    const myEmitter = new MyEmitter()
    const options = yargsConf()
    const search = new RegExp(`(.*${options.search}.*`, 'g')

    const showFileContents = async (filePath) => {
        if (isFile(filePath)){
            return new Promise((resolve)=>{
                const transformStream = transformChunks(search)
                const stream = fs.createReadStream(filePath, 'utf-8')
                stream.on('end', resolve)
                stream.pipe(transformStream).pipe(process.stdout)
            })
        } else {
            const filesInPath = await getFileNamesInDirectory(filePath)
            const userInput = await promptUser(filesInPath)
            myEmitter.emit('changePath', path.join(filePath, userInput))
        }
    }
    myEmitter.on('changePath', (path)=>{
        showFileContents(path).catch(console.log)
    })
    myEmitter.emit('changePath', options.path ?? process.cwd())
}

hw_4()