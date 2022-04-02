//  Library
import * as core from '@actions/core'
import { inputs } from './metadata'

//  Type Definitions
import type { ScreenshotOptions } from 'puppeteer-core'

//  ======
//  CONFIG
//  ======

/** URL to take screenshot of */
export const url: string = core.getInput(inputs.url, { required: true })
if (!url) { throw new Error('URL is required!') }

/** Screenshot fileName */
export const path: string = core.getInput(inputs.path)

/** Screenshot width */
export const width: number = parseInt(core.getInput(inputs.width))
/** Screenshot height */
export const height: number = parseInt(core.getInput(inputs.height))
/** Should take screenshot of the entire page */
export const captureFullPage = core.getBooleanInput(inputs.captureFullPage)
/** Should capture beyond viewport */
export const captureBeyondViewport = core.getBooleanInput(inputs.captureBeyondViewport)
/** Should omit the background */
export const omitBackground = core.getBooleanInput(inputs.omitBackground)
/** encoding */
export const encoding = core.getInput(inputs.encoding) as ScreenshotOptions['encoding']


/** Boolean flag to determine if the action generates artifacts */
export const shouldCreateArtifacts: boolean = core.getBooleanInput(inputs.shouldCreateArtifacts)

/** Time to wait before taking screenshot */
export const delay: number = +core.getInput(inputs.delay)

/** Prefers Dark Color Scheme */
export const darkMode: boolean = core.getBooleanInput(inputs.darkMode)