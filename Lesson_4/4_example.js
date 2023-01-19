import readLine from 'readline'

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question('Please enter the path to the file', (inPath)=>{
    console.log(inPath)

    rl.close()
})

rl.on('close', ()=>process.exit(0))