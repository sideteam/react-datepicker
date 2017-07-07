import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

/* eslint-disable react/no-multi-comp */
class ExampleCustomInput extends React.Component {
  static displayName = 'ExampleCustomInput';

  static propTypes = {
    onClick: React.PropTypes.func,
    value: React.PropTypes.string
  };

  render() {
    return (
      <button
          className="example-custom-input"
          onClick={this.props.onClick}>
          {this.props.value}
      </button>
    )
  }
}

export default class extends React.Component {
  static displayName = 'Custom Input';

  state = {
    startDate: moment()
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
            {'var ExampleCustomInput = React.createClass({'}<br />
            {'displayName: "ExampleCustomInput" ,'}<br />
          <br />
            {'propTypes: {'}<br />
              {'onClick: React.PropTypes.func,'}<br />
              {'value: React.PropTypes.string'}<br />
            {'},'}<br />
          <br />
            {'render () {'}<br />
              {'return ('}<br />
                {'<button'}<br />
                  {'className="example-custom-input"'}<br />
                  {'onClick={this.props.onClick}>'}<br />
                  {'{this.props.value}'}<br />
                  {'</button>'}<br />
              {')'}<br />
            {'}'}<br />
          {'})'}<br />
          <br />
          {'...'}<br />
          <br />
          {'<DatePicker'}<br />
              {'customInput={<ExampleCustomInput />}'}<br />
              {'selected={this.state.startDate}'}<br />
              {'onChange={this.handleChange} />'}
        </code>
      </pre>
      <div className="column">
        <DatePicker
            customInput={<ExampleCustomInput />}
            selected={this.state.startDate}
            onChange={this.handleChange} />
      </div>
    </div>
  }
}
