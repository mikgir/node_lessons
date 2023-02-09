import http from 'http';
import url from 'url';
import {findRoute} from './routing.js'

const host = 'localhost'
const port = 3000

const users = [
    {name: 'Anton', age: 25, id: 1},
    {name: 'Sergei', age: 34, id: 2},
    {name: 'Elena', age: 30, id: 3},
]

const routes = {
    '/': () => '<h1>Hello world!</h1>',
    '/users': (params) => users,
    '/users/:id': (params) => {
        return users.find(item => item.id === +params.id)
    },
    '/users/:id/age': (params) => {
        const user = users.find(item => item.id === +params.id)
        if (user) {
            return {age: user.age}
        }
        return {status: 'User not found'}
    }
}

const server = http.createServer((request, response) => {
    let result = ''
    if (request.method === 'GET') {
        const queryParams = url.parse(request.url, true)
        const routeParams = findRoute(request.url.split('?')[0], routes)
        const [routeCallback, params] = routeParams

        if (typeof routeCallback === 'function') {
            result = routeCallback(params)
        }
        if (routeCallback === null) {
            response.statusCode = 404
            result = {error: 'Not found'}
        }
        result = JSON.stringify(result)
    }
    response.end(result)
})

server.listen(port, host, () => console.log(`Server is running at http://${host}:${port}`))