const fs = require('fs');
const moment = require('moment');
const { normalizeURL } = require('./sweep');
// report to console
function printReportConsole(pages) {
    // write to text file
    // write to csv file
    console.log("==================================================");
    console.log(" REPORT ".white.inverse);
    console.log("==================================================");
    const sortedPages = sortPages(pages);
    for (const sortedPage of sortedPages) {
        const url = sortedPage[0]
        const hits = sortedPage[1]
        console.log(`Found ${hits} links to page: ${url}`)
    }
    console.log("==================================================");
    console.log(" END of REPORT ".white.inverse);
    console.log("==================================================");
}

// report to csv file
function printReportWriteFile(pages) {
   const now = moment().format('YYYY-MM-DD-HH-mm-ss');
   const fileName = `report_${now}.csv`
   const dir = './reports';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
   const csvFilePath = dir + '/' + fileName;
    const reportArr = [];

    const sortedPages = sortPages(pages);
    for (const sortedPage of sortedPages) {
        const url = sortedPage[0];
        const hits = sortedPage[1];
        reportArr.push([url, hits]);
    }
    const normalizedDocTitle = normalizeURL(process.argv[2])
    const csvHeader = `${normalizedDocTitle} WEB-Link Sweeps REPORT \n`;
    const csvContent = csvHeader + reportArr.join("\n");
    fs.writeFileSync(csvFilePath, csvContent,
        { encoding: "utf8", flag: "w" });
}

function sortPages(pages) {
    const pagesArr = Object.entries(pages);
    pagesArr.sort((a,b) => {
        aHits = a[1]
        bHits = b[1]
        return b[1] - a[1]
    })
    return pagesArr
}


module.exports = {
  sortPages,
  printReportWriteFile,
  printReportConsole
};