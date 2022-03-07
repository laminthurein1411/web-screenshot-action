//  Library
import * as core from '@actions/core'

//  Type Definitions
import type { screenshotFileType } from '../types'

//  ======
//  CONFIG
//  ======

/** URL to take screenshot of */
export const url: string = core.getInput('url', { required: true })

/** Screenshot width */
export const width: number = parseInt(core.getInput('width'))
/** Screenshot height */
export const height: number = parseInt(core.getInput('height'))
/** Should take screenshot of the entire page */
export const captureFullPage = core.getBooleanInput('captureFullPage')

/** Screenshot fileName */
export const name: string = core.getInput('name')

/** Screenshot fileType */
export const type: screenshotFileType = core.getInput('type') as screenshotFileType

/** Boolean flag to determine if the action generates artifacts */
export const shouldCreateArtifacts: boolean = core.getBooleanInput('createArtifacts')