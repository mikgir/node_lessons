import http from 'http'
import url from 'url'

const host = 'localhost'
const port = 3000

const server = http.createServer((request, response) => {

    if (request.method === 'GET') {
        const queryParams = url.parse(request.url, true)
        console.log(queryParams)
        response.end(JSON.stringify(queryParams))
    }else {
        response.statusCode = 405
        response.end('Method not allowed')
    }
})

server.listen(port, host, () => console.log(`Server is running at http://${host}:${port}`))