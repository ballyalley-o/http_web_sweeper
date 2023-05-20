const { sweepPage } = require('./sweep')
require('colors')

async function main() {
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
    const pages = await sweepPage(baseURL, baseURL, {})

    for (const page of Object.entries(pages)) {
      console.log(page);
    }
}

main()

module.exports = {
    main
}