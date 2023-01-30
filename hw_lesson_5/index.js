import http from "http"
import url from "url"
import path from "path"
import fs from "fs"
import {
    isFile,
    getFileNamesInDirectory,
    showFileContents,
    errorHandler
} from './func.js'

const host = 'localhost'
const port = 3000

const server = http.createServer(async (req, res)=>{
    const queryParams = url.parse(req.url, true).query
    const queryPath = queryParams.path ?? process.cwd()
    const queryTarget = queryParams.target ?? ''
    const navPath = path.join(queryPath, queryTarget)

    if (!fs.existsSync(queryPath)){
        errorHandler(res, 'path')
    } else if (fs.existsSync(queryPath) && !fs.existsSync(navPath)){
        errorHandler(res, 'file')
    } else {
        if (isFile(navPath)){
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            await showFileContents(navPath, res)
        }else {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            const response = await getFileNamesInDirectory(navPath)
            response.forEach(item =>{
                res.write(`<p><a href="?target=${item}&path=${navPath}">${item}</a></p>`)
            })
        }
        res.end()
    }
})
server.listen(port, host, ()=> console.log(`Server is running at http://${host}:${port}`))
