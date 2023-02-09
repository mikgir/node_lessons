import fs from 'fs'
import path from "path"
import http from "http"
import {Server} from 'socket.io';

const host = "localhost";
const port = 3010

const server = http.createServer((request, response)=>{
    if (request.method === 'GET'){
        const filePath = path.join(process.cwd(), "./index.html");
        const readStream = fs.createReadStream(filePath)
        readStream.pipe(response)
    }else if (request.method === 'POST') {
        let data = ''
        request.on('data', chunk =>{
            data += chunk
        })
        request.on('end', ()=>{
            const parseData = JSON.parse(data)
            console.log(parseData)

            response.writeHead(200, {'Content-Type': 'json'})
        })
    } else {
        response.statusCode = 405
        response.end()
    }
})

const socket = new Server(server)

socket.on('connection', (socket)=>{
    const clientAlias = `Client '${Math.floor(Math.random()*100)}':`

    console.log('New connection')
    socket.broadcast.emit('new-conn-event', {
        msg: 'Connected', userName: clientAlias
    })
    socket.on('client-msg', (data)=>{
        socket.broadcast.emit('server-msg', {
            msg: data.msg, userName: clientAlias
        })
        socket.emit('server-msg', {
            msg: data.msg, userName: clientAlias
        })
    })
    socket.on('disconnect', ()=>{
        socket.broadcast.emit('server-msg', {
            msg: 'Disconnected', userName: clientAlias
        })
    })

})
server.listen(port, host, () =>
    console.log(`Server running at http://${host}:${port}`))
