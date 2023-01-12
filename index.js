import colors from 'colors'

const args= process.argv.slice(2)

const users = args.join(' and ')

console.log(`Hello ${colors.green(users)} !`)