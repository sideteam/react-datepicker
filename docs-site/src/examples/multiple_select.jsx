import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import createReactClass from 'create-react-class'

export default createReactClass({
  displayName: 'Default',

  getInitialState () {
    return {
      startDate: [moment(), moment().add(12, 'day')]
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
              {'onChange={this.handleChange} '}<br />
              {'multipleSelect={true} />'}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            inline
            minDate={moment()}
            maxDate={moment().add(2, 'month')}
            selected={this.state.startDate}
            onChange={this.handleChange} 
            multipleSelect={true} />
      </div>
    </div>
  }
})

// selected={[this.state.startDate, this.state.startDate.add('day', 2)]}
