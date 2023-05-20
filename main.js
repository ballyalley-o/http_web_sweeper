const { sweepPage, normalizeURL } = require('./sweep');
const { printReportWriteFile, printReportConsole } = require("./report");
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
    const normalizedBaseURL = normalizeURL(baseURL)
    console.log(` SWEEP HAS STARTED on ${baseURL}`.bgBlue)
    const pages = await sweepPage(baseURL, baseURL, {})
    printReportConsole(pages);
    printReportWriteFile(pages);
    console.log(
      ` REPORT has been generated and documented for: ${normalizedBaseURL}`
        .bgBlue
    );
}

main()

module.exports = {
    main
}