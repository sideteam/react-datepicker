import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'

/* eslint-disable react/no-multi-comp */
var ExampleCustomInput = createReactClass({
  displayName: 'ExampleCustomInput',

  propTypes: {
    onClick: PropTypes.func,
    value: PropTypes.string
  },

  render () {
    return (
      <button
          className="example-custom-input"
          onClick={this.props.onClick}>
          {this.props.value}
      </button>
    )
  }
})

export default createReactClass({
  displayName: 'Custom Input',

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
            {'var ExampleCustomInput = createReactClass({'}<br />
            {'displayName: "ExampleCustomInput" ,'}<br />
          <br />
            {'propTypes: {'}<br />
              {'onClick: PropTypes.func,'}<br />
              {'value: PropTypes.string'}<br />
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
})
