//  Library
import puppeteer from 'puppeteer-core'
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as io from '@actions/io'

//  Helpers
import { getChromePath, getFilePath, delay } from './helpers'

//  Types
import type { config } from './library'

/** Capture screenshot of the given URL */
export async function captureScreenshot(url: string, name: string, options?: typeof config) {

    //  Get options
    const width = options?.width || 1920
    const height = options?.height || 1080
    const fullPage = options?.captureFullPage || false
    const type = options?.type || 'png'
    const duration = options?.delay || 1000
    const darkMode = options?.darkMode || false

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

    //  Enable dark-mode if needed
    if (darkMode) {
        page.emulateMediaFeatures([
            { name: 'prefers-color-scheme', value: 'dark' }
        ])
    }

    //  Wait for some time before proceeding. Gives the page some breathing room to load properly
    await delay(duration)

    //  Create sub-directory if it doesn't exist
    if (!fs.existsSync(path.dirname(name))) {
        console.log(path.dirname(name))
        await io.mkdirP(path.dirname(name))
    }

    //  Take screenshot of the webpage and save it as a PNG
    await page.screenshot({
        fullPage,
        type,
        path: `${process.env.GITHUB_WORKSPACE}/${getFilePath(name, type)}`,
    })

    //  Close the browser
    await browser.close()

}