import DateInput from './date_input'
import Calendar from './calendar'
import PropTypes from 'prop-types'
import React from 'react'
import createReactClass from 'create-react-class'
import TetherComponent from './tether_component'
import classnames from 'classnames'
import {isSameDay, isDayDisabled, isDayInRange} from './date_utils'
import moment from 'moment'
import onClickOutside from 'react-onclickoutside'

var outsideClickIgnoreClass = 'react-datepicker-ignore-onclickoutside'
var WrappedCalendar = onClickOutside(Calendar)

/**
 * General datepicker component.
 */

export default createReactClass({
  displayName: 'DatePicker',

  propTypes: {
    autoComplete: PropTypes.string,
    autoFocus: PropTypes.bool,
    calendarClassName: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    customInput: PropTypes.element,
    dateFormat: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]),
    dateFormatCalendar: PropTypes.string,
    disabled: PropTypes.bool,
    disabledKeyboardNavigation: PropTypes.bool,
    dropdownMode: PropTypes.oneOf(['scroll', 'select']).isRequired,
    endDate: PropTypes.object,
    excludeDates: PropTypes.array,
    filterDate: PropTypes.func,
    fixedHeight: PropTypes.bool,
    highlightDates: PropTypes.array,
    id: PropTypes.string,
    includeDates: PropTypes.array,
    inline: PropTypes.bool,
    isClearable: PropTypes.bool,
    locale: PropTypes.string,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    monthsShown: PropTypes.number,
    name: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onChangeRaw: PropTypes.func,
    onFocus: PropTypes.func,
    onMonthChange: PropTypes.func,
    openToDate: PropTypes.object,
    peekNextMonth: PropTypes.bool,
    placeholderText: PropTypes.string,
    popoverAttachment: PropTypes.string,
    popoverTargetAttachment: PropTypes.string,
    popoverTargetOffset: PropTypes.string,
    readOnly: PropTypes.bool,
    renderCalendarTo: PropTypes.any,
    required: PropTypes.bool,
    scrollableYearDropdown: PropTypes.bool,
    selected: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.arrayOf(PropTypes.object)
    ]),
    selectsEnd: PropTypes.bool,
    selectsStart: PropTypes.bool,
    showMonthDropdown: PropTypes.bool,
    showWeekNumbers: PropTypes.bool,
    showYearDropdown: PropTypes.bool,
    forceShowMonthNavigation: PropTypes.bool,
    startDate: PropTypes.object,
    tabIndex: PropTypes.number,
    tetherConstraints: PropTypes.array,
    title: PropTypes.string,
    todayButton: PropTypes.string,
    utcOffset: PropTypes.number,
    withPortal: PropTypes.bool,
    multipleSelect: PropTypes.bool
  },

  getDefaultProps () {
    return {
      dateFormatCalendar: 'MMMM YYYY',
      onChange () {},
      disabled: false,
      disabledKeyboardNavigation: false,
      dropdownMode: 'scroll',
      onFocus () {},
      onBlur () {},
      onMonthChange () {},
      popoverAttachment: 'top left',
      popoverTargetAttachment: 'bottom left',
      popoverTargetOffset: '10px 0',
      tetherConstraints: [
        {
          to: 'window',
          attachment: 'together'
        }
      ],
      utcOffset: moment().utcOffset(),
      monthsShown: 1,
      withPortal: false
    }
  },

  getInitialState () {
    let preSelection
    if (this.props.multipleSelect) {
      if (Array.isArray(this.props.selected)) {
        preSelection = this.props.selected.map((dateSelected) => {
          return moment(dateSelected)
        })
      } else {
        preSelection = moment()
      }
    } else {
      preSelection = this.props.selected ? moment(this.props.selected) : moment()
    }
    return {
      open: false,
      preventFocus: false,
      preSelection
    }
  },

  componentWillUnmount () {
    this.clearPreventFocusTimeout()
  },

  clearPreventFocusTimeout () {
    if (this.preventFocusTimeout) {
      clearTimeout(this.preventFocusTimeout)
    }
  },

  setFocus () {
    this.refs.input.focus()
  },

  setOpen (open) {
    this.setState({
      open: open,
      preSelection: open && this.state.open ? this.state.preSelection : this.getInitialState().preSelection
    })
  },

  handleFocus (event) {
    if (!this.state.preventFocus) {
      this.props.onFocus(event)
      this.setOpen(true)
    }
  },

  cancelFocusInput () {
    clearTimeout(this.inputFocusTimeout)
    this.inputFocusTimeout = null
  },

  deferFocusInput () {
    this.cancelFocusInput()
    this.inputFocusTimeout = window.setTimeout(() => this.setFocus(), 1)
  },

  handleDropdownFocus () {
    this.cancelFocusInput()
  },

  handleBlur (event) {
    if (this.state.open) {
      this.deferFocusInput()
    } else {
      this.props.onBlur(event)
    }
  },

  handleCalendarClickOutside (event) {
    this.setOpen(false)
    if (this.props.withPortal) { event.preventDefault() }
  },

  handleSelect (date, event) {
    // Preventing onFocus event to fix issue
    // https://github.com/Hacker0x01/react-datepicker/issues/628
    this.setState({ preventFocus: true },
      () => {
        this.preventFocusTimeout = setTimeout(() => this.setState({ preventFocus: false }), 50)
        return this.preventFocusTimeout
      }
    )
    this.setSelected(date, event)
    if (!this.props.multipleSelect) {
      this.setOpen(false)
    }
  },

  setSelected (date, event) {
    let changedDate = date

    if (changedDate !== null && isDayDisabled(changedDate, this.props)) {
      return
    }
    if (!isSameDay(this.props.selected, changedDate)) {
      if (this.props.multipleSelect) {
        changedDate = new Array(changedDate)
        const preSelected = Array.isArray(this.state.preSelection)
          ? changedDate.concat(this.state.preSelection)
          : changedDate
        this.setState({ preSelection: preSelected })
        this.props.onChange(preSelected, event)
      } else {
        this.setState({
          preSelection: changedDate
        })
        this.props.onChange(changedDate, event)
      }
    } else {
      if (changedDate !== null) {
        if (this.props.multipleSelect) {
          const preSelected = this.state.preSelection
          let index
          preSelected.find((item, idx) => {
            if (item.format(`L`) === changedDate.format(`L`)) {
              index = idx
            }
          })
          preSelected.splice(index, 1)
          this.setState({ preSelection: preSelected })
          this.props.onChange(preSelected, event)
        }
      }
    }
  },

  setPreSelection (date) {
    const isDateRangePresent = ((typeof this.props.minDate !== 'undefined') && (typeof this.props.maxDate !== 'undefined'))
    const isValidDateSelection = isDateRangePresent ? isDayInRange(date, this.props.minDate, this.props.maxDate) : true
    if (isValidDateSelection) {
      this.setState({
        preSelection: date
      })
    }
  },

  onInputClick () {
    if (!this.props.disabled) {
      this.setOpen(true)
    }
  },

  onInputKeyDown (event) {
    if (!this.state.open && !this.props.inline) {
      if (/^Arrow/.test(event.key)) {
        this.onInputClick()
      }
      return
    }
    const copy = moment(this.state.preSelection)
    if (event.key === 'Enter') {
      event.preventDefault()
      this.handleSelect(copy, event)
    } else if (event.key === 'Escape') {
      event.preventDefault()
      this.setOpen(false)
    } else if (event.key === 'Tab') {
      this.setOpen(false)
    }
    if (!this.props.disabledKeyboardNavigation) {
      let newSelection
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          newSelection = copy.subtract(1, 'days')
          break
        case 'ArrowRight':
          event.preventDefault()
          newSelection = copy.add(1, 'days')
          break
        case 'ArrowUp':
          event.preventDefault()
          newSelection = copy.subtract(1, 'weeks')
          break
        case 'ArrowDown':
          event.preventDefault()
          newSelection = copy.add(1, 'weeks')
          break
        case 'PageUp':
          event.preventDefault()
          newSelection = copy.subtract(1, 'months')
          break
        case 'PageDown':
          event.preventDefault()
          newSelection = copy.add(1, 'months')
          break
        case 'Home':
          event.preventDefault()
          newSelection = copy.subtract(1, 'years')
          break
        case 'End':
          event.preventDefault()
          newSelection = copy.add(1, 'years')
          break
      }
      this.setPreSelection(newSelection)
    }
  },

  onClearClick (event) {
    event.preventDefault()
    this.props.onChange(null, event)
  },

  renderCalendar () {
    if (!this.props.inline && (!this.state.open || this.props.disabled)) {
      return null
    }
    return <WrappedCalendar
        ref="calendar"
        locale={this.props.locale}
        dateFormat={this.props.dateFormatCalendar}
        dropdownMode={this.props.dropdownMode}
        selected={this.props.selected}
        preSelection={this.state.preSelection}
        onSelect={this.handleSelect}
        openToDate={this.props.openToDate}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        selectsStart={this.props.selectsStart}
        selectsEnd={this.props.selectsEnd}
        startDate={this.props.startDate}
        endDate={this.props.endDate}
        excludeDates={this.props.excludeDates}
        filterDate={this.props.filterDate}
        onClickOutside={this.handleCalendarClickOutside}
        highlightDates={this.props.highlightDates}
        includeDates={this.props.includeDates}
        inline={this.props.inline}
        peekNextMonth={this.props.peekNextMonth}
        showMonthDropdown={this.props.showMonthDropdown}
        showWeekNumbers={this.props.showWeekNumbers}
        showYearDropdown={this.props.showYearDropdown}
        forceShowMonthNavigation={this.props.forceShowMonthNavigation}
        scrollableYearDropdown={this.props.scrollableYearDropdown}
        todayButton={this.props.todayButton}
        utcOffset={this.props.utcOffset}
        outsideClickIgnoreClass={outsideClickIgnoreClass}
        fixedHeight={this.props.fixedHeight}
        monthsShown={this.props.monthsShown}
        onDropdownFocus={this.handleDropdownFocus}
        onMonthChange={this.props.onMonthChange}
        className={this.props.calendarClassName}>
      {this.props.children}
    </WrappedCalendar>
  },

  renderDateInput () {
    var className = classnames(this.props.className, {
      [outsideClickIgnoreClass]: this.state.open
    })

    return <DateInput
        ref="input"
        id={this.props.id}
        name={this.props.name}
        autoFocus={this.props.autoFocus}
        date={this.props.selected}
        locale={this.props.locale}
        minDate={this.props.minDate}
        maxDate={this.props.maxDate}
        excludeDates={this.props.excludeDates}
        includeDates={this.props.includeDates}
        filterDate={this.props.filterDate}
        dateFormat={this.props.dateFormat}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onClick={this.onInputClick}
        onChangeRaw={this.props.onChangeRaw}
        onKeyDown={this.onInputKeyDown}
        onChangeDate={this.setSelected}
        placeholder={this.props.placeholderText}
        disabled={this.props.disabled}
        autoComplete={this.props.autoComplete}
        className={className}
        title={this.props.title}
        readOnly={this.props.readOnly}
        required={this.props.required}
        tabIndex={this.props.tabIndex}
        customInput={this.props.customInput}
        multipleSelect={this.props.multipleSelect}/>
  },

  renderClearButton () {
    if (this.props.isClearable && this.props.selected != null) {
      return <a className="react-datepicker__close-icon" href="#" onClick={this.onClearClick} />
    } else {
      return null
    }
  },

  render () {
    const calendar = this.renderCalendar()

    if (this.props.inline) {
      return calendar
    }

    if (this.props.withPortal) {
      return (
        <div>
          <div className="react-datepicker__input-container">
            {this.renderDateInput()}
            {this.renderClearButton()}
          </div>
          {
          this.state.open
          ? <div className="react-datepicker__portal">
              {calendar}
            </div>
          : null
          }
        </div>
      )
    }

    return (
      <TetherComponent
          classPrefix={'react-datepicker__tether'}
          attachment={this.props.popoverAttachment}
          targetAttachment={this.props.popoverTargetAttachment}
          targetOffset={this.props.popoverTargetOffset}
          renderElementTo={this.props.renderCalendarTo}
          constraints={this.props.tetherConstraints}>
        <div className="react-datepicker__input-container">
          {this.renderDateInput()}
          {this.renderClearButton()}
        </div>
        {calendar}
      </TetherComponent>
    )
  }
})
