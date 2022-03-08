/**
 * Wait for time
 * @param time time in milliseconds
 */
export const delay = (time: number) => new Promise(resolve => setTimeout(resolve, time))