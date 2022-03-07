//  Library
import puppeteer from 'puppeteer-core'

//  Helpers
import { getChromePath } from './helpers'

type captureOptions = {
    width?: number,
    height?: number
}

export async function captureScreenshot(url: string, name: string, options?: captureOptions) {

    const width = options?.width || 1920
    const height = options?.height || 1080

    const browser = await puppeteer.launch({
        executablePath: getChromePath(),
        defaultViewport: { height, width }
    })

    const page = await browser.newPage()
    await page.goto(url, {
        waitUntil: 'networkidle2'
    })

    await page.screenshot({
        path: `${process.env.GITHUB_WORKSPACE}/${name}.png`
    })

    await browser.close()
}