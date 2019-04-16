import React from 'react'
import PropTypes from 'prop-types'
import Nav from './Nav.js'
import Timeline from './Timeline.js'
import Add from './Add.js'
import { saveEvents } from '../util.js'

/**
 * the main application component
 */
class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      start: props.start,
      end: props.end,
      events: props.events
    }
  }

  /**
   * generic handler for state updates
   *
   * @param {Object} state An object with state keys attached
   */
  refine (state) {
    this.setState(state)
  }

  /**
   * @param {Object} ev The event object from the add event form
   * @param {ev.name} string Name of the event
   * @param {ev.start} string Date string e.g. '2019-04-17'
   * @param {ev.end} string Date string e.g. '2019-04-17'
   */
  addEvent (ev) {
    this.setState(state => ({
      events: state.events.concat({
        id: Date.now(), // just need it to not conflict
        ...ev
      })
    }), () => {
      saveEvents(this.state.events)
    })
  }

  render () {
    const { events, start, end } = this.state

    return (
      <React.Fragment>
        <header className='cal__header f aic jcc'>
          <div className='container mxa x'>
            <h1 className='mb025'>Timeline</h1>
            <p className='s4'>
              Select a start and end date to view events within that range.
            </p>
            <Nav
              refine={this.refine.bind(this)}
              start={start}
              end={end} />
          </div>
        </header>

        <Timeline start={start} end={end} events={events} />

        <Add addEvent={this.addEvent.bind(this)} />
      </React.Fragment>
    )
  }
}

App.propTypes = {
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

export default App
