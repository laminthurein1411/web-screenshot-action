//  Library
import * as core from '@actions/core'

//  Type Definitions
import type { ScreenshotOptions } from 'puppeteer-core'

//  ======
//  CONFIG
//  ======

/** URL to take screenshot of */
export const url: string = core.getInput('url', { required: true })

/** Screenshot fileName */
export const path: string = core.getInput('path')

/** Screenshot width */
export const width: number = parseInt(core.getInput('width'))
/** Screenshot height */
export const height: number = parseInt(core.getInput('height'))
/** Should take screenshot of the entire page */
export const captureFullPage = core.getBooleanInput('captureFullPage')
/** Should capture beyond viewport */
export const captureBeyondViewport = core.getBooleanInput('captureBeyondViewport')
/** Should omit the background */
export const omitBackground = core.getBooleanInput('omitBackground')
/** encoding */
export const encoding = core.getInput('encoding') as ScreenshotOptions['encoding']


/** Boolean flag to determine if the action generates artifacts */
export const shouldCreateArtifacts: boolean = core.getBooleanInput('shouldCreateArtifacts')

/** Time to wait before taking screenshot */
export const delay: number = +core.getInput('delay')

/** Prefers Dark Color Scheme */
export const darkMode: boolean = core.getBooleanInput('darkMode')