import moment from 'moment'
import PropTypes from 'prop-types';
import React, { Component } from 'react'
import { isSameDay, isDayDisabled, isSameUtcOffset } from './date_utils'
import map from 'lodash/map';

export default class DateInput extends Component {
  static displayName = 'DateInput';

  static propTypes = {
    customInput: PropTypes.element,
    date: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.object),
    ]),
    dateFormat: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]),
    disabled: PropTypes.bool,
    excludeDates: PropTypes.array,
    filterDate: PropTypes.func,
    includeDates: PropTypes.array,
    locale: PropTypes.string,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onChangeRaw: PropTypes.func,
    onChangeDate: PropTypes.func,
    multipleSelect: PropTypes.bool
  };

  static defaultProps = {
    dateFormat: 'L'
  };

  componentWillReceiveProps(newProps) {
    this.setState({ value: this.safeDateFormat(newProps) });
  }

  handleChange = (event) => {
    if (this.props.onChange) {
      this.props.onChange(event)
    }
    if (this.props.onChangeRaw) {
      this.props.onChangeRaw(event)
    }
    if (!event.defaultPrevented) {
      this.handleChangeDate(event.target.value)
    }
  };

  handleChangeDate = (value) => {
    if (this.props.onChangeDate) {
      var date = moment(value.trim(), this.props.dateFormat, this.props.locale || moment.locale(), true)
      if (date.isValid() && !isDayDisabled(date, this.props)) {
        this.props.onChangeDate(date)
      } else if (value === '') {
        this.props.onChangeDate(null)
      }
    }
    this.setState({value})
  };

  safeDateFormat = (props) => {
    const dateOrDates = Array.isArray(props.date) ? props.date.filter(d => d && d.isValid()) : props.date;
    if (!dateOrDates) return '';
    return dateOrDates && (this.props.multipleSelect ? map(dateOrDates, this.formatDate(props)) : this.formatDate(props)(dateOrDates));
  };

  formatDate = (props) => {
    return (date) => (
      date.clone()
        .locale(props.locale || moment.locale())
        .format(Array.isArray(props.dateFormat) ? props.dateFormat[0] : props.dateFormat) || ''
    );
  };

  handleBlur = (event) => {
    this.setState({
      value: this.safeDateFormat(this.props)
    })
    if (this.props.onBlur) {
      this.props.onBlur(event)
    }
  };

  focus = () => {
    this.refs.input.focus()
  };

  state = {
    value: this.safeDateFormat(this.props)
  };

  render() {
    const { multipleSelect, customInput, date, locale, minDate, maxDate, excludeDates, includeDates, filterDate, dateFormat, onChangeDate, onChangeRaw, ...rest } = this.props // eslint-disable-line no-unused-vars

    if (customInput) {
      return React.cloneElement(customInput, {
        ...rest,
        ref: 'input',
        value: this.state.value,
        onBlur: this.handleBlur,
        onChange: this.handleChange
      })
    } else {
      return <input
          ref="input"
          type="text"
          {...rest}
          value={this.state.value}
          onBlur={this.handleBlur}
          onChange={this.handleChange}/>
    }
  }
}
