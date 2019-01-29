import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import createReactClass from 'create-react-class'

export default createReactClass({
  displayName: 'Default',

  getInitialState () {
    return {
      startDate: moment()
    }
  },

  handleChange (date) {
    this.setState({
      startDate: date
    })
  },

  render () {
    return <div className="row">
      <pre className="column example__code">
        <code className="jsx">
          {'<DatePicker'}<br />
              {'selected={this.state.startDate}'}<br />
              {'onChange={this.handleChange}'}<br />
              {'showWeekNumbers />'}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            selected={this.state.startDate}
            onChange={this.handleChange}
            showWeekNumbers />
      </div>
    </div>
  }
})
