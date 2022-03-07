//  Types
import { screenshotFileType } from '../types'

/** Returns the file-path with extension */
export const getFilePath = (name: string, type: screenshotFileType) => `${name}.${type}`