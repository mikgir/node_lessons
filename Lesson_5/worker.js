import http from "http";

const host = 'localhost'
const startedPort = 3000
const shift = parseInt(process.argv[2])
const port = startedPort + shift

const server = http.createServer((request, response)=>{
    console.log(`Worker ${process.pid} handle this request....`)
    response.end('Hello world!')
})

server.listen(port, host, ()=> console.log(`Server is running at http://${host}:${port}`))