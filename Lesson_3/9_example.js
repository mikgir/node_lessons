import {Duplex, PassThrough} from 'stream'
import {createReadStream, createWriteStream} from 'fs'

const rs = createReadStream('./dup.log')
const ws = createWriteStream('./ips.log')

class Throttle extends Duplex {
    constructor(ms) {
        super();
        this.delay = ms
    }

    _read() {
    }
    _write(chunk, encoding, callback) {
        this.push(chunk)
        setTimeout(callback, this.delay)
    }
    _final() {
        this.push(null)
    }
}

const report = new PassThrough()
const throttle = new Throttle(100)

let total = 0
report.on('data', (chunk)=>{
    total+=chunk.length
    console.log('bytes : ', total)
})
rs.pipe(throttle).pipe(report).pipe(ws)