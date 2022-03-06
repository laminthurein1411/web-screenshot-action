//  Library
import * as core from '@actions/core'

//  ======
//  CONFIG
//  ======

export const url: string = core.getInput('url', { required: true })

export const name: string = core.getInput('name') || 'screenshot.png'