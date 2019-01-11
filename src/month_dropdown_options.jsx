import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

var MonthDropdownOptions = createReactClass({
  displayName: 'MonthDropdownOptions',

  propTypes: {
    onCancel: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    month: PropTypes.number.isRequired,
    monthNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
  },

  renderOptions () {
    var selectedMonth = this.props.month
    var options = this.props.monthNames.map((month, i) =>
      <div className="react-datepicker__month-option"
          key={month}
          ref={month}
          onClick={this.onChange.bind(this, i)}>
        {selectedMonth === i ? <span className="react-datepicker__month-option--selected">✓</span> : ''}
        {month}
      </div>
    )

    return options
  },

  onChange (month) {
    this.props.onChange(month)
  },

  handleClickOutside () {
    this.props.onCancel()
  },

  render () {
    return (
      <div className="react-datepicker__month-dropdown">
        {this.renderOptions()}
      </div>
    )
  }
})

module.exports = MonthDropdownOptions
