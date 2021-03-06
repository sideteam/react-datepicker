import moment from 'moment'

export function isSameDay (moment1, moment2) {
  if (moment1 && moment2) {
    if (Array.isArray(moment1) || Array.isArray(moment2)) {
      return Array.isArray(moment1)
        ? isSameDayInArray(moment2, moment1)
        : isSameDayInArray(moment1, moment2)
    }
    return moment1.isSame(moment2, 'day')
  } else {
    return !moment1 && !moment2
  }
}

export function isSameDayInArray (moment1, momentArray) {
  if (moment1 && momentArray) {
    let inArray = false
    momentArray.map((moment2) => {
      if (moment1.isSame(moment2, 'day')) {
        inArray = true;
        return
      }
    })
    return inArray
  }
  return !moment1 && !momentArray
}

export function isSameUtcOffset (moment1, moment2) {
  if (moment1 && moment2) {
    return moment1.utcOffset() === moment2.utcOffset()
  } else {
    return !moment1 && !moment2
  }
}

export function isDayInRange (day, startDate, endDate) {
  const before = startDate.clone().startOf('day').subtract(1, 'seconds')
  const after = endDate.clone().startOf('day').add(1, 'seconds')
  return day.clone().startOf('day').isBetween(before, after)
}

export function isDayDisabled (day, { minDate, maxDate, excludeDates, includeDates, filterDate } = {}) {
  return (minDate && day.isBefore(minDate, 'day')) ||
    (maxDate && day.isAfter(maxDate, 'day')) ||
    (excludeDates && excludeDates.some(excludeDate => isSameDay(day, excludeDate))) ||
    (includeDates && !includeDates.some(includeDate => isSameDay(day, includeDate))) ||
    (filterDate && !filterDate(day.clone())) ||
    false
}

export function allDaysDisabledBefore (day, unit, { minDate, includeDates } = {}) {
  if (Array.isArray(day)) {
    day = getMinimumDate(day);
  }
  const dateBefore = day.clone().subtract(1, unit)
  return (minDate && dateBefore.isBefore(minDate, unit)) ||
    (includeDates && includeDates.every(includeDate => dateBefore.isBefore(includeDate, unit))) ||
    false
}

export function allDaysDisabledAfter (day, unit, { maxDate, includeDates } = {}) {
  if (Array.isArray(day)) {
    day = getMaximunDate(day);
  }
  const dateAfter = day.clone().add(1, unit)
  return (maxDate && dateAfter.isAfter(maxDate, unit)) ||
    (includeDates && includeDates.every(includeDate => dateAfter.isAfter(includeDate, unit))) ||
    false
}

export function getEffectiveMinDate ({ minDate, includeDates }) {
  if (includeDates && minDate) {
    return moment.min(includeDates.filter(includeDate => minDate.isSameOrBefore(includeDate, 'day')))
  } else if (includeDates) {
    return moment.min(includeDates)
  } else {
    return minDate
  }
}

export function getEffectiveMaxDate ({ maxDate, includeDates }) {
  if (includeDates && maxDate) {
    return moment.max(includeDates.filter(includeDate => maxDate.isSameOrAfter(includeDate, 'day')))
  } else if (includeDates) {
    return moment.max(includeDates)
  } else {
    return maxDate
  }
}

export function getMinimumDate (dates) {
  if (dates && dates.length) {
    return dates.reduce((pre, current) => {
      return (pre.unix() - current.unix()) > 0
        ? current
        : pre
    })
  } 
}

export function getMaximunDate (dates) {
  if (dates && dates.length) {
    return dates.reduce((pre, current) => {
      return (pre.unix() - current.unix()) < 0
        ? current
        : pre
    })
  }
}
