//  Library
import * as core from '@actions/core'
import { captureScreenshot } from './captureScreenshot'
import { config, createArtifacts } from './library'
import { getFilePath } from './helpers'

//  ====
//  MAIN
//  ====

/** Web-Screenshot Action Main Function */
async function action() {

    //  Get config parameters
    const { url, name, type, shouldCreateArtifacts } = config

    //  Capture screenshot of the given web url
    await captureScreenshot(url, name, config)

    //  Generate artifacts
    if (shouldCreateArtifacts) {
        createArtifacts(name, [`./${getFilePath(name, type)}`])
    }

}

/** Runs the GitHub Action. Main-entrypoint. */
async function run() {
    try {
        action()
    } catch (err) {
        let error = err as Error
        core.setFailed(error)
        process.exit(1)
    }
}

run()