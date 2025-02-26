import React, { Component } from 'react'
import HeaderTitle from '../common/HeaderTitle'
import HomeTableCalendar from './HomeTableCalendar'
import { HeaderCalendar } from '../CalendarWeek/HeaderCalendarweek'
import { HeaderTextCalendar } from '../Calendar/HeaderTextCalendar'

class CalendarContainer extends Component {
  render () {
    return (
      <div className='container-main'>
        <div className='row'>
          <div className='col-12'>
            <HeaderTitle title='Visao Semanal' />
            <div>
              <HeaderTextCalendar textheader={this.props.textheader} />
            </div>
            <div>
              <HeaderCalendar
                calendar={this.props.calendar}
                dispatchUpdateFilterListAvailability={newDate => {
                  this.props.dispatchUpdateFilterListAvailability(newDate)
                }}
                dispatchUpdateTextFooter={newDate => {
                  this.props.dispatchUpdateTextFooter(newDate)
                }}
                dispatchUpdateTextHeader={newDate => {
                  this.props.dispatchUpdateTextHeader(newDate)
                }}
              />
            </div>
            <HomeTableCalendar
              isLoadingCalendar={this.props.isLoadingCalendar}
              booking={this.props.booking}
            />
            {/* {this.props.isLoadingCalendar ? (
                <LoadingCalendar title='a carregar o calendario...' />
              ) : (
                <HomeTableCalendar
                  isLoadingCalendar={this.props.isLoadingCalendar}
                  booking={this.props.booking}
                />
              )} */}
          </div>
        </div>
      </div>
    )
  }
}

export default CalendarContainer
