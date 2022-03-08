//  Types
import type { ScreenshotOptions } from 'puppeteer-core'

/** Returns the file-path with extension */
export const getFilePath = (name: string, type: ScreenshotOptions['type'] = 'png') => `${name}.${type}`