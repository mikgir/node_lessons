import http from 'http'
import url from 'url'
import {findRoute} from './routing.js'
import routes from "./routes/index.js";

const host = 'localhost'
const port = 3000

const server = http.createServer((request, response) => {
    if (['GET', 'POST', 'PUT'].includes(request.method)) {
        const queryParams = url.parse(request.url, true).query
        const routeParams = findRoute(request.url.split('?')[0], routes)
        response.setHeader('Content-Type', 'application/json')

        const [endpoint, params] = routeParams

        let data = ''
        request.on('data', (chunk) => {
            data += chunk
        })
        request.on('end', () => {
            let result
            let body
            try {
                body = JSON.parse(data)
            } catch (e) {

            }
            const method = request.method.toLocaleLowerCase()
            if (endpoint && typeof endpoint[method] === 'function') {
                result = endpoint[method](params, queryParams, body)
                response.end(JSON.stringify(result))
            } else if (endpoint === null) {
                response.statusCode = 404
                response.end(JSON.stringify({error: 'Not found'}))
            }else {
                response.statusCode=405
                response.end(JSON.stringify({error:'Not allowed'}))
            }
        })
    }

})

server.listen(port, host, () => console.log(`Server is running at http://${host}:${port}`))