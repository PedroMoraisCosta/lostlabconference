import React, { useEffect, useState } from 'react'

export const HeaderCalendar = props => {
  const [days, setDays] = useState([])
  const [endWeek, setEndWeek] = useState()
  const [startWeek, setStartWeek] = useState()

  function fillInStates (startDate) {
    const startweek = new Date(startDate)

    let finishDay = new Date(startDate)
    finishDay.setDate(startDate.getDate() + 6)

    let arrDays = []

    for (let q = startDate; q <= finishDay; q.setDate(q.getDate() + 1)) {
      arrDays.push(q.getDate().toString())
    }

    setStartWeek(startweek)

    setEndWeek(startDate)

    setDays(arrDays)

    //props.dispatchUpdateTextFooter(startweek)

    props.dispatchUpdateTextHeader(startweek)
  }

  useEffect(() => {
    let currentDate = new Date()

    if (props.selectedDay) {
      currentDate = new Date(props.selectedDay)
      props.dispatchUpdateTextFooter(currentDate)
    }

    let daysIndex = currentDate.getDay()

    if (daysIndex == 0) {
      daysIndex = 7
    }
    const startweek = new Date(currentDate)
    startweek.setDate(startweek.getDate() - daysIndex + 1)

    fillInStates(startweek)

    if (props.selectedDay) {
      props.dispatchUpdateTextFooter(currentDate)
    }

    return
  }, [days.length])

  function UpdateDaysBack (event) {
    event.preventDefault()
    let oneweekbefore = new Date(startWeek)
    oneweekbefore.setDate(oneweekbefore.getDate() - 7)
    fillInStates(oneweekbefore)

    const startweek = new Date(oneweekbefore)
    //props.dispatchUpdateTextFooter(startweek)

    // props.dispatchUpdateTextHeader(startweek)

    props.dispatchUpdateFilterListAvailability(startweek)
  }

  function UpdateDaysForward (event) {
    event.preventDefault()
    fillInStates(endWeek)
    const startweek = new Date(endWeek)
    //props.dispatchUpdateTextFooter(startweek)

    // props.dispatchUpdateTextHeader(startweek)

    props.dispatchUpdateFilterListAvailability(startweek)
  }

  function renderDayNumberLabel (day) {
    let currentDay = new Date()
    let cssName = 'calendar-day-text-button'
    let cssNameCircle = ''
    if (
      currentDay.getDate() == day &&
      startWeek.getMonth() == currentDay.getMonth()
    ) {
      cssNameCircle = 'calendar-day-text-button-currentday'
    }
    return (
      <td className='calendar-day-text' key={day}>
        <div className={cssNameCircle}>
          <div className={cssName}>{day}</div>
        </div>
      </td>
    )
  }

  return (
    <table className='calendar-table'>
      <tbody>
        <tr>
          <td className='calendar-td-btleft'>
            <button
              className='btn-calendar btn-primary'
              onClick={UpdateDaysBack}
            >
              {' '}
              &lt;
            </button>
          </td>

          {days.map(d => renderDayNumberLabel(d))}
          <td className='calendar-td-btright'>
            <button
              className='btn-calendar btn-primary'
              onClick={UpdateDaysForward}
            >
              {' '}
              &gt;
            </button>
          </td>
        </tr>
        <tr className='calendar-dayweek-text-row'>
          <td className='calendar-dayweek-text'></td>
          <td className='calendar-dayweek-text'>Seg</td>
          <td className='calendar-dayweek-text-holiday'>Ter</td>
          <td className='calendar-dayweek-text'>Qua</td>
          <td className='calendar-dayweek-text'>Qui</td>
          <td className='calendar-dayweek-text'>Sex</td>
          <td className='calendar-dayweek-text'>Sab</td>
          <td className='calendar-dayweek-text-holiday'>Dom</td>
          <td className='calendar-dayweek-text'></td>
        </tr>
      </tbody>
    </table>
  )
}
