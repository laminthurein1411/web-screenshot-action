//  Library
import * as core from '@actions/core'
import * as artifact from '@actions/artifact'
import { captureScreenshot } from './captureScreenshot'
import { url, name } from './library'


//  ====
//  MAIN
//  ====

async function run() {
    try {
        await captureScreenshot(url, name)
        const client = artifact.create()
        const artifactName = name
        const upload = await client.uploadArtifact(artifactName, [`./${name}.png`], './')

        core.setOutput('path', `./${name}.png`)
    } catch (err) {
        let error = err as Error
        core.setFailed(error.message)
    }
}

run()