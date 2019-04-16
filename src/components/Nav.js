import React from 'react'
import PropTypes from 'prop-types'
import {
  isValidDate,
  sanitizeDate
} from '../util.js'

/**
 * the date values here are upcycled back into Date instances so that we can
 * verify they're valid and convert them to strings for use as the `value`
 * attribute on the date inputs.
 */
function Nav ({ refine, start, end }) {
  const startDate = new Date(start)
  const endDate = new Date(end)

  return (
    <nav className='cal__nav rel mxa f aic fw x'>
      <div className='mr1 mt1'>
        <label htmlFor='start' className='block rel h6 caps mb05'>Start:</label>
        <input
          id='start'
          type='date'
          name='start'
          className='block s4'
          value={isValidDate(startDate) ? sanitizeDate(startDate) : ''}
          onChange={e => refine({
            start: e.target.value
          })} />
      </div>

      <div className='mr1 mt1'>
        <label htmlFor='end' className='block rel h6 caps mb05'>End: </label>
        <input
          id='end'
          type='date'
          name='endDate'
          className='block s4'
          value={isValidDate(endDate) ? sanitizeDate(endDate) : ''}
          onChange={e => refine({
            end: e.target.value
          })} />
      </div>
    </nav>
  )
}

Nav.propTypes = {
  refine: PropTypes.func.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired
}

export default Nav
