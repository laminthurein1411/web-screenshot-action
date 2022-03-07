//  Library
import * as core from '@actions/core'
import { captureScreenshot } from './captureScreenshot'
import { config, createArtifacts } from './library'

//  ====
//  MAIN
//  ====

/** Web-Screenshot Action Main Function */
async function action() {

    //  Get config parameters
    const { url, name, width, height, shouldCreateArtifacts } = config

    //  Capture screenshot of the given web url
    await captureScreenshot(url, name, { width, height })

    //  Generate artifacts
    if (shouldCreateArtifacts) {
        createArtifacts(name, [`./${name}.png`])
    }

}

/** Runs the GitHub Action. Main-entrypoint. */
async function run() {
    try {
        action()
    } catch (err) {
        let error = err as Error
        core.setFailed(error.message)
    }
}

run()