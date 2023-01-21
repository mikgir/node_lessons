import {Transform} from 'stream'
import {createReadStream, createWriteStream} from 'fs'
import path from 'path'

const rs = createReadStream('./access.log')
const ws = createWriteStream('./ips.log')

const transformStream = new Transform({
    transform(chunk, encoding, callback) {
        const editedChank = chunk.toString().replace(/((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}/g, '*.*.*.*')
        this.push(editedChank)

        callback()
    }
})
rs.pipe(transformStream).pipe(ws)