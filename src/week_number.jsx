import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'

var WeekNumber = createReactClass({
  displayName: 'WeekNumber',

  propTypes: {
    weekNumber: PropTypes.number.isRequired
  },

  render () {
    return (
      <div
          className="react-datepicker__week-number"
          aria-label={`week-${this.props.weekNumber}`}>
        {this.props.weekNumber}
      </div>
    )
  }
})

module.exports = WeekNumber
