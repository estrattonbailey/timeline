import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

/**
 * The large + button as well as the form for adding events to the timeline
 */
class Add extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false
    }

    this.ref = React.createRef()

    this.handleDocClick = this.handleDocClick.bind(this)
  }

  // close when clicking outside the form
  handleDocClick (e) {
    if (
      e.target !== this.ref.current
      && !this.ref.current.contains(e.target)
    ) {
      this.setState({ open: false })
    }
  }

  componentDidMount () {
    document.addEventListener('click', this.handleDocClick)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleDocClick)
  }

  render () {
    const { open } = this.state
    const { addEvent } = this.props

    return (
      <div ref={this.ref} className={cx('add fix z10', {
        'is-open': open
      })}>
        <button className='add__button f aic jcc abs right bottom z9' onClick={e => this.setState(state => ({
          open: !state.open
        }))}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='currentcolor' strokeWidth='3'>
            <path d='M0 8h16M8 0v16' />
          </svg>
        </button>

        {open && (
          <div className='add__form-container abs right bottom s5 z10'>
            <button className='add__form__close f aic jcc abs right top z1' onClick={e => this.setState(state => ({
              open: !state.open
            }))}>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='currentcolor' strokeWidth='3'>
                <path d='M0 8h16M8 0v16' />
              </svg>
            </button>

            <form className='add__form' onSubmit={e => {
              e.preventDefault()
              e.persist()

              const inputs = e.target.elements

              addEvent({
                name: inputs.name.value,
                start: inputs.start.value,
                end: inputs.end.value
              })

              e.target.reset()
              this.setState({ open: false })
            }}>
              <div className='add__form__inner rel'>
                <label
                  htmlFor='name'
                  className='block rel mb025'>
                  Name
                </label>
                <input
                  id='name'
                  className='block rel mb1'
                  placeholder='Name'
                  required />

                <label
                  htmlFor='start'
                  className='block rel mb025'>
                  Start
                </label>
                <input
                  id='start'
                  type='date'
                  className='block rel mb1'
                  required />

                <label
                  htmlFor='end'
                  className='block rel mb025'>
                  End
                </label>
                <input
                  id='end'
                  type='date'
                  className='block rel'
                  required />
              </div>

              <button type='submit' className='add__form__submit s5 mt1 caps ac x'><strong>Add Event</strong></button>
            </form>
          </div>
        )}
      </div>
    )
  }
}

Add.propTypes = {
  addEvent: PropTypes.func.isRequired
}

export default Add
