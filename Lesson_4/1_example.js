import fs from 'fs'
import path from 'path'

const fileName = process.argv[2]
const __dirname = '/mike/node_lessons/lesson_4'

fs.readFile(path.join(__dirname, fileName), 'utf-8', (err, data)=>{
    console.log(data)
})