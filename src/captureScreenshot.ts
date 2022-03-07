//  Library
import puppeteer from 'puppeteer-core'

//  Helpers
import { getChromePath } from './helpers'

type captureOptions = {
    width?: number,
    height?: number,
    captureFullPage?: boolean
}

/** Capture screenshot of the given URL */
export async function captureScreenshot(url: string, name: string, options?: captureOptions) {

    //  Get options
    const width = options?.width || 1920
    const height = options?.height || 1080
    const fullPage = options?.captureFullPage || false

    //  Launch browser with the provided settings
    const browser = await puppeteer.launch({
        executablePath: getChromePath(),
        defaultViewport: { height, width }
    })

    //  Navigate to the given URL
    const page = await browser.newPage()
    await page.goto(url, {
        waitUntil: 'networkidle2'
    })

    //  Take screenshot of the webpage and save it as a PNG
    await page.screenshot({
        fullPage,
        path: `${process.env.GITHUB_WORKSPACE}/${name}.png`,
    })

    //  Close the browser
    await browser.close()

}