import colors from 'colors'

const [begin, end] = process.argv.slice(2)

let currentIndex = 0

function makeOutput(num, idx) {
    switch (idx){
        case 1:
            console.log(colors.yellow(num))
            break
        case 2:
            console.log(colors.red(num))
            break
        default:
            console.log(colors.green(num))
            break
    }

}

function output(number) {
    makeOutput(number, currentIndex)
    if (currentIndex !== 2) {
        currentIndex++
    } else {
        currentIndex = 0
    }
}

function createSimpleNumbers(begin, end) {

    let startPoint
    if (begin <= 1) {
        startPoint = 2
    } else {
        startPoint = begin
    }
    for (let i = startPoint; i < end; i++) {
        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                break
            }
        }
        output(i)
    }
}

function simpleNumbers(beginRange, endRange) {
    let begin = +beginRange
    let end = +endRange
    if (checkErrors()) {
        return false
    }
    createSimpleNumbers(begin, end)

}

function checkErrors() {
    if (!begin || !end){
        console.log(colors.red("Нет входных данных"))
        return true
    }
    if (isNaN(begin) || isNaN(end)){
        console.log(colors.red("Входные параметры должны быть числом"))
        return true
    }
    return false
}
simpleNumbers(begin, end)