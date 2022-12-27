import EventEmitter from "events";
import Time from "./Time.js";
import Handler from "./Handler.js";

const task2 = () => {
    class TimeEmitter extends EventEmitter {
    }

    const emitter = new TimeEmitter()

    emitter.on('getTimers', Handler.holder.bind(Handler))
    Handler.interval = setInterval(() => emitter.emit('getTimers'), 1000)

    const args = process.argv.slice(2)

    args.forEach(item => {
        Handler.setTimer(new Time(item))
    })
}

task2()

// Запуск node timer.js
// Ввод аргументов в формате:  час-число-месяц-год