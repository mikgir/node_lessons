import http from 'http';
import url from 'url';


const host = 'localhost'
const port = 3000

const server = http.createServer((req, res) => {
    if (req.method === "POST") {
        res.writeHead(200, {'Content-Type': 'application/json'})

        let data = ''
        req.on('data', (chunk) => {
            data += chunk
        })
        req.on('end', ()=>{
            try {
                const body = JSON.parse(data)
                console.log(body)
            }catch (e) {
                console.error(e.message)
            }
        })
        res.end(data)
    }
})
server.listen(port, host, ()=>console.log(`Server running at http://${host}:${port}`))