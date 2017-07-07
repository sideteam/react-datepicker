import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

export default class extends React.Component {
  static displayName = 'Default';

  state = {
    startDate: [moment(), moment().add(12, 'day')]
  };

  handleChange = (date) => {
    this.setState({
      startDate: date
    })
  };

  render() {
    return <div className="row">
      <pre className="column example__code">
        <code className="jsx">
          {'<DatePicker'}<br />
              {'selected={this.state.startDate}'}<br />
              {'onChange={this.handleChange} '}<br />
              {'multipleSelect />'}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            inline
            minDate={moment()}
            maxDate={moment().add(2, 'month')}
            selected={this.state.startDate}
            onChange={this.handleChange}
            multipleSelect />
      </div>
    </div>
  }
}

// selected={[this.state.startDate, this.state.startDate.add('day', 2)]}
