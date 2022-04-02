//  Library
import * as core from '@actions/core'
import action from './action'

//  ====
//  MAIN
//  ====

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