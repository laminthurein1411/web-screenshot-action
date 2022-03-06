//  Library
import * as core from '@actions/core'
import { captureScreenshot } from './captureScreenshot'
import { url, name } from './library'


//  ====
//  MAIN
//  ====

async function run() {
    try {
        await captureScreenshot(url, name)
    } catch (err) {
        let error = err as Error
        core.setFailed(error.message)
    }
}

run()