//  Library
import * as core from '@actions/core'

//  ====
//  MAIN
//  ====

async function run() {
    try {
        // await capture()
    } catch (err) {
        let error = err as Error
        core.setFailed(error.message)
    }
}

run()