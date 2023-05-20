const { JSDOM } = require('jsdom');
require('colors')

async function sweepPage(baseURL, currURL, pages) {
    const baseURLObj = new URL(baseURL);
    const currURLObj = new URL(currURL);

    if (baseURLObj.hostname !== currURLObj.hostname) {
        return pages;
    }

    const normalizedCurrURL = normalizeURL(currURL);
    if (pages[normalizedCurrURL] > 0) {
        pages[normalizedCurrURL]++
        return pages;
    }
    pages[normalizedCurrURL] = 1

    console.log(` STATUS: Sweeping ${currURL} `)

   try {
     const resp = await fetch(currURL);
     if (resp.status > 399) {
        console.log(`ERROR in fetch with status code: ${resp.status} on this URL: ${currURL}`.bgRed)
        return pages;
     }

     const contentType = resp.headers.get('content-type');
     if (!contentType.includes('text/html')) {
         console.log(
           ` NON-HTML RESPONSE content type: ${contentType}, on this URL: ${currURL} `.bgRed
         );
         return pages;
     }
    const htmlBody = await resp.text();
    const nextURLs = getURLsFromHTML(htmlBody, baseURL)

    for (const nextURL of nextURLs) {
        pages = await sweepPage(baseURL, nextURL, pages)
    }

   } catch (error) {
        console.log(` ERROR in fetch: ${error.message}, on this URL: ${currURL} `.bgRed)
   }
   return pages
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === '/') {
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`);
                urls.push(urlObj.href);
            } catch (error) {
                console.log(` ERROR with relative url: ${error.message} `.bgRed)
            }
        } else {
            try {
            const urlObj = new URL(linkElement.href);
            urls.push(urlObj.href);
            } catch (error) {
            console.log(` ERROR with absolute url: ${error.message} `.bgRed);
            }
        }

    }
    return urls
}

function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }
    return hostPath
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    sweepPage
}