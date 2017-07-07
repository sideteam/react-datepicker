import PropTypes from 'prop-types';
import React, { Component } from 'react'

export default class WeekNumber extends Component {
  static displayName = 'WeekNumber';

  static propTypes = {
    weekNumber: PropTypes.number.isRequired
  };

  render() {
    return (
      <div
          className="react-datepicker__week-number"
          aria-label={`week-${this.props.weekNumber}`}>
        {this.props.weekNumber}
      </div>
    )
  }
}
