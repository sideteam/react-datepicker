import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default class extends React.Component {
  static displayName = 'HeroExample';

  state = {
    startDate: moment()
  };

  handleChange = (date) => {
    this.setState({
      startDate: date
    })
  };

  render() {
    return <DatePicker
        autoFocus
        selected={this.state.startDate}
        onChange={this.handleChange} />
  }
}
