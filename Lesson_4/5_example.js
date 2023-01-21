import readLine from 'readline'
import fs from 'fs'
import path from 'path'

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

const __dirname = '/mike/node_lessons/lesson_4'

rl.question('Please enter the path to the file', (inPath)=>{
    fs.readFile(path.join(__dirname, inPath), 'utf-8', (err, data)=>{
        console.log(data)
    })

    rl.close()
})

rl.on('close', ()=>process.exit(0))