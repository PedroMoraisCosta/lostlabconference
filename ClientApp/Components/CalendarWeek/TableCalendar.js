import React, { Component, Fragment, useState } from 'react'
import LoadingCalendar from '../common/LoadingCalendar'

export default class TableCalendar extends Component {
  renderLastColumn () {
    return <td className='tablecalendar-lastcolumn'></td>
  }
  renderColumnHour (finalHour) {
    return <td className='tablecalendar-hourscolumn'>{finalHour}</td>
  }
  renderHoliday () {
    return <td className='tablecalendar-day-text_holiday'></td>
  }
  renderBooked () {
    return <td className='tablecalendar-day-text_booked'></td>
  }
  renderFree () {
    return <td className='tablecalendar-day-text_free'></td>
  }
  renderLunchTime () {
    return <td className='tablecalendar-day-text_lunchtime'></td>
  }

  calculateHour (startWorkingTime) {
    if (startWorkingTime.length == 1) {
      return '0' + startWorkingTime
    }

    return startWorkingTime
  }

  AddHalfHour (hour, addHalfHourToTheCurrentHour) {
    let d = new Date()
    d.setHours(parseInt(hour))
    if (addHalfHourToTheCurrentHour) {
      d.setHours(d.getHours() + 1)
    }
    return d.getHours().toString()
  }

  AddHour (hour) {
    let d = new Date()
    d.setHours(parseInt(hour) + 1)
    return d.getHours().toString()
  }

  renderHour (hour, halfHour) {
    let indexHour = parseInt(hour)
    switch (true) {
      case indexHour > 0:
        let finalHour = hour
        if (!halfHour) {
          finalHour = finalHour.concat(':00')
        } else {
          finalHour = finalHour.concat(':30')
        }
        return this.renderColumnHour(finalHour)
      default:
    }
  }

  renderCell (rowIndex) {
    let html = [0]
    html[0] = ''
    let _daysInAweek = 7
    for (let index = 0; index < _daysInAweek; index++) {
      const element = this.props.items[rowIndex * _daysInAweek + index]
      if (element == 0) {
        html[0] = html.concat(this.renderFree())
      }
      if (element == 1) {
        html[0] = html.concat(this.renderBooked())
      }
      if (element == 2) {
        html[0] = html.concat(this.renderLunchTime())
      }
      if (element == 3) {
        html[0] = html.concat(this.renderHoliday())
      }
    }
    return html
  }

  renderTable () {
    let html = [0]
    let weekday = 0
    let _totalRows = 22
    let _startWorkingTime = '09'
    let _showHalfHours = true
    let _lunchTimeIndex = [ 8, 9]

    html[0] = ''

    let aux_showHalHours = false
    let aux_startWorkingTime = _startWorkingTime

    for (let index = 0; index < _totalRows; index++) {
      if (!_lunchTimeIndex.includes(index)) {
        html[0] = html.concat(
          <tr className='tablecalendar-dayweek-text-row'>
            {this.renderHour(
              this.calculateHour(aux_startWorkingTime.toString()),
              aux_showHalHours
            )}
            {this.renderCell(index)}
            {this.renderLastColumn()}
          </tr>
        )
      }
      if (_lunchTimeIndex.includes(index) && index == _lunchTimeIndex[0]) {
        html[0] = html.concat(
          <tr className='tablecalendar-dayweek-text-row'>
            {this.renderColumnHour('')}
            {this.renderCell(index)}
            {this.renderLastColumn()}
          </tr>
        )
      }

      if (_showHalfHours) {
        aux_startWorkingTime = this.AddHalfHour(
          aux_startWorkingTime,
          aux_showHalHours
        )
        aux_showHalHours = !aux_showHalHours
      } else {
        aux_startWorkingTime = this.AddHour(aux_startWorkingTime)
      }

      weekday++
      if ((weekday = 6)) weekday = 0
    }
    return html
  }

  render () {
    return (
      <Fragment>
        <div>
          <LoadingCalendar isLoading={this.props.isLoadingCalendar} />
        </div>
        <div className='calendar-topposition'>
          <table className='calendar-table'>
            <tbody>{this.renderTable()}</tbody>
          </table>
        </div>
      </Fragment>
    )
  }
}
