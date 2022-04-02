//  Library
import * as core from '@actions/core'
import puppeteer from 'puppeteer-core'

//  Helpers
import * as config from './config'
import { getChromePath } from './helpers'
import { createArtifacts } from './library'
import { captureScreenshot } from './captureScreenshot'

//  ====
//  MAIN
//  ====

/** Web-Screenshot Action Main Function */
async function action() {

    //  Get config parameters
    const { width, height, shouldCreateArtifacts } = config

    //  Launch browser with the provided settings
    const browser = await puppeteer.launch({
        executablePath: getChromePath(),
        defaultViewport: { height, width }
    })

    //  Create a new browser page
    const page = await browser.newPage()

    //  Capture screenshot of the given web url
    await captureScreenshot(page)

    //  Generate artifacts
    if (shouldCreateArtifacts) {
        createArtifacts('screenshots', [`./${config.path}`])
        core.notice('📷 Screenshot artifacts created 📦')
    }

    //  Close the browser
    await browser.close()

    core.notice('📷 Screenshots Captured ✅')

}

/** Main-entrypoint. Runs the GitHub Action */
async function run() {
    try {
        action()
    } catch (err) {
        let error = err as Error
        core.error(error)
        core.setFailed(error)
    }
}

run()