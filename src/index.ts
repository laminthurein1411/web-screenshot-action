//  Library
import * as core from '@actions/core'
import { captureScreenshot } from './captureScreenshot'
import { config, createArtifacts } from './library'

//  ====
//  MAIN
//  ====

async function run() {
    try {
        await captureScreenshot(config.url, config.name)

        if (config.createArtifacts) {
            createArtifacts(config.name, [`./${config.name}.png`])
        }
    } catch (err) {
        let error = err as Error
        core.setFailed(error.message)
    }
}

run()