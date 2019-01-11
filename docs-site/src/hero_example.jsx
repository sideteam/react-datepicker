import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import createReactClass from 'create-react-class'

export default createReactClass({
  displayName: 'HeroExample',

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
    return <DatePicker
        autoFocus
        selected={this.state.startDate}
        onChange={this.handleChange} />
  }
})
