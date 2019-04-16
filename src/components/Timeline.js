import React from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import {
  DAY,
  getDayRange,
  parseEvent
} from '../util.js'

/**
 * all the heavy lifting is done here
 *  - dates are converted to timestamps for easy comparison
 *  - events are pared down as much as possible to increase performance
 *  - events are keyed using rowIndex to ensure events can flow across days
 */
function Timeline ({ events, start, end }) {
  const startTimestamp = Date.parse(start)
  const endTimestamp = Date.parse(end)

  // get subset of events that are within range
  const eventsInRange = events
    .map(ev => parseEvent(ev, startTimestamp, endTimestamp))
    .filter(ev => {
      return ev.start >= startTimestamp && ev.start <= endTimestamp
    })

  // create "empty" array of days within the date range
  const dayRange = getDayRange(startTimestamp, endTimestamp)

  // our "index" of which rows contain which events
  const rowIndex = []

  // map over each day in our range and insert associate events
  const days = dayRange.reduce((_days, { date }, i) => {
    // find events for the current day
    let matchedEvents = eventsInRange.filter(ev => {
      return ev.start === date
        || ev.end === date
        || date >= ev.start && date <= ev.end // eslint-disable-line
    })

    // create flat array for index references
    const ids = matchedEvents.map(ev => ev.id)

    for (let i = 0; i < ids.length; i++) {
      // check if a given event is in a previous column and row
      const index = rowIndex.indexOf(ids[i])

      if (index < 0) {
        // find first vacant row for a new event
        const openRow = rowIndex.filter(row => !ids.filter(id => id === row)[0])[0]

        if (openRow !== undefined) {
          const openIndex = rowIndex.indexOf(openRow)
          rowIndex[openIndex] = ids[i]
        } else {
          rowIndex.push(ids[i])
        }
      }
    }

    // fill events array with events according to rowIndex
    _days[i].events = rowIndex
      .map(id => matchedEvents[ids.indexOf(id)])
      // filter out duplicate keys, if they exist
      .reduce((_rows, r) => {
        if (!r) return _rows
        if (!_rows.filter(({ id }) => id === r.id)[0]) _rows.push(r)
        return _rows
      }, [])

    return _days
  }, dayRange.slice(0))

  // check if the columns can fit at their min-width
  const flexyColumns = (window.innerWidth / 150) > days.length

  return (
    <main className='cal rel'>
      <ul className='cal__inner f y'>
        {days.length ? days.map((day, i) => {
          // re-translate this back to non-zero based by adding a DAY
          const colTitle = format(new Date(day.date + DAY), 'MMM DD')

          return (
            <li className='cal__day' key={day.date} style={{
              width: flexyColumns ? (100 / days.length) + 'vw' : '25vw',
              zIndex: (days.length + 100) - i // LTR z-index decrease for hover effects
            }}>
              <header className='s6 f aic jcc'><div>{colTitle}</div></header>

              <ul className='cal__events'>
                {day.events.map((ev, o) => {
                  // fill with empty slot if no event or already rendered
                  if (!ev || ev.start !== day.date) {
                    return <li key={ev ? ev.id : o} className='cal__event--empty'></li>
                  }

                  return (
                    <li key={ev.id} tabIndex='0' className='cal__event' style={{
                      width: (((ev.duration / DAY) + 1) * 100) + '%', // again, convert back from zero-indexed
                    }}>
                      <div className='cal__event__bar abs left f aic'>
                        <div className='cal__event__label abs'>{ev.name} ({ev.id})</div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        }) : (
          <div className='f jcc x'>
            <div className='s1 p1'>
              <p className='s6'>Please select a valid date range</p>
            </div>
          </div>
        )}
      </ul>
    </main>
  )
}

Timeline.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ),
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired
}

export default Timeline
