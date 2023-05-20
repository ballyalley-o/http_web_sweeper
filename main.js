const { sweepPage } = require('./sweep')
require('colors')

function main() {
    if (process.argv.length < 3) {
        console.log('NO website/url provided'.bgRed)
        process.exit(1)
    }
    if (process.argv.length > 3) {
       console.log("TOO MANY website/url provided".bgRed);
       process.exit(1);
    }
    const baseURL = process.argv[2]
    console.log(` SWEEP HAS STARTED on ${baseURL}`.bgBlue)
    sweepPage(baseURL)
}

main()

module.exports = {
    main
}