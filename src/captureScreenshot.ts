//  Library
import * as fs from 'node:fs'
import * as path from 'node:path'
import * as io from '@actions/io'

//  Helpers
import { config } from './library'
import { delay } from './helpers'

//  Types
import type { Page, ScreenshotOptions } from 'puppeteer-core'

/** Capture screenshot of the given URL */
export async function captureScreenshot(page: Page) {

    //  Get options
    const name = path.basename(config.path)
    const type = path.extname(config.path).slice(1) as ScreenshotOptions['type']
    const {
        url,
        delay: duration,
        darkMode,
        captureFullPage: fullPage,
        captureBeyondViewport,
        encoding,
        omitBackground,
    } = config

    //  Navigate to the given URL
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
    if (!fs.existsSync(path.dirname(config.path))) {
        await io.mkdirP(path.dirname(config.path))
    }

    //  Take screenshot of the webpage and save it as a PNG
    await page.screenshot({
        type,
        fullPage,
        captureBeyondViewport,
        encoding,
        omitBackground,
        path: `${process.env.GITHUB_WORKSPACE}/${config.path}`,
    })

}