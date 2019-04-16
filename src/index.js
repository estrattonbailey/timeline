import './index.css'
import React from 'react'
import { render } from 'react-dom'
import timelineItems from './timelineItems.js'
import App from './components/App.js'
import { loadEvents } from './util.js'

render((
  <App
    start='2019-04-01'
    end='2019-04-20'
    events={loadEvents() || timelineItems} />
), document.getElementById('root'))
