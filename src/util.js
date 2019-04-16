export const DAY = 1000 * 60 * 60 * 24 // one day, in milliseconds

/**
 * @param {number} startTime Starting range timestamp
 * @param {number} endTime Ending range timestamp
 *
 * @return {Object[]} An "empty" array of day objects
 */
export function getDayRange (startTime, endTime) {
  const days = []

  // inclusive of last day
  for (let i = startTime; i <= endTime; i) {
    days.push({
      date: i
    })
    i = i + DAY
  }

  return days
}

/**
 * @param {Object} ev The event object
 * @param {number} startTime Starting range timestamp
 * @param {number} endTime Ending range timestamp
 *
 * @return {Object} A formatted event with timestamps in place of date strings
 */
export function parseEvent (ev, startTime, endTime) {
  const start = Math.min(Date.parse(ev.end), Math.max(Date.parse(ev.start), startTime)) // clip to start of date range
  const end = Math.min(Date.parse(ev.end), endTime) // clip to end of date range

  return {
    ...ev,
    startDate: ev.start,
    endDate: ev.end,
    start,
    end,
    duration: end - start
  }
}

/**
 * @param {Object} date A Date instance
 *
 * @return {bool} True if the date is valid
 */
export function isValidDate (date) {
  return date instanceof Date && !isNaN(date.getTime())
}

/**
 * @param {Object} date A Date instance
 *
 * @return {string} A date string e.g. '2019-04-17'
 */
export function sanitizeDate (date) {
  return date.toISOString().substr(0, 10)
}

/**
 * @param {Object[]} events An array of event objcets in their pre-parsed form
 *
 * @return undefined
 */
export function saveEvents (events) {
  const ls = window.localStorage

  console.log('save', events)

  if (ls) {
    ls.setItem('esb_ae', JSON.stringify(events))
  }
}

/**
 * @return {Object[]} If storage exists, returns all events
 */
export function loadEvents () {
  const ls = window.localStorage

  if (ls) {
    const localEvents = ls.getItem('esb_ae')

    if (localEvents) {
      return JSON.parse(localEvents)
    }
  }
}
