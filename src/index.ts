//  Library
import * as core from '@actions/core'
import puppeteer from 'puppeteer-core'
import { captureScreenshot } from './captureScreenshot'
import { config, createArtifacts } from './library'
import { getFilePath, getChromePath } from './helpers'

//  ====
//  MAIN
//  ====

/** Web-Screenshot Action Main Function */
async function action() {

    //  Get config parameters
    const { url, name, type, width, height, shouldCreateArtifacts } = config

    //  Launch browser with the provided settings
    const browser = await puppeteer.launch({
        executablePath: getChromePath(),
        defaultViewport: { height, width }
    })

    //  Create a new browser page
    const page = await browser.newPage()

    //  Capture screenshot of the given web url
    await captureScreenshot(page, url, name, config)

    //  Generate artifacts
    if (shouldCreateArtifacts) {
        createArtifacts(name, [`./${getFilePath(name, type)}`])
    }

    //  Close the browser
    await browser.close()

}

/** Main-entrypoint. Runs the GitHub Action */
async function run() {
    try {
        action()
    } catch (err) {
        let error = err as Error
        core.setFailed(error)
    }
}

run()