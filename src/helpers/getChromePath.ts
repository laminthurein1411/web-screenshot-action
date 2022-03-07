//  Library
import * as os from 'node:os'
import * as path from 'node:path'

/** Returns the path to the Chrome executable on the current operating system */
export function getChromePath(): string {
    let location: string = ''

    //  Determine the chrome.exe location for the current os
    switch (os.type()) {
        case 'Windows_NT':
            const programFiles = os.arch() === 'x64'
                ? process.env["PROGRAMFILES(X86)"]
                : process.env["PROGRAMFILES"]


            if (!programFiles) { throw new Error('Could not locate PROGRAMFILES') }

            location = path.join(programFiles, "Google/Chrome/Application/chrome.exe")
            break

        case 'Linux':
            location = "/usr/bin/google-chrome"
            break

        case 'Darwin':
            location = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
            break
    }

    //  Throw error if the chrome path could not be determined
    if (!location) { throw new Error(`Failed to run on ${os.type()}`) }

    //  Normalize and return
    return path.normalize(location)
}