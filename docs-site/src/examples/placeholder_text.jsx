import React from 'react'
import DatePicker from 'react-datepicker'

export default class extends React.Component {
  static displayName = 'PlaceholderText';

  render() {
    return <div className="row">
      <pre className="column example__code">
        <code className="jsx">
          {'<DatePicker placeholderText="Click to select a date" />'}
        </code>
      </pre>
      <div className="column">
        <DatePicker placeholderText="Click to select a date" />
      </div>
    </div>
  }
}
