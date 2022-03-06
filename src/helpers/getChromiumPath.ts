//  Library
import * as os from 'node:os'
import * as path from 'node:path'

export function getChromiumPath(): string {
    let location: string = ''

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

    if (!location) { throw new Error(`Failed to run on ${os.type()}`) }

    return path.normalize(location)
}

console.log(getChromiumPath())