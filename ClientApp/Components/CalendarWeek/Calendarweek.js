import React, { Component, useState } from 'react'
import Container from './CalendarweekContainer'
import { connect } from 'react-redux'
import {
  dispatchUpdateTextFooter,
  dispatchUpdateTextHeader
} from '.././../../redux/actions/calendar'
import {
  dispatchUpdateFilterListAvailability,
  FetchData,
  BookingAvailability
} from '.././../../redux/actions/booking'
import Loading from '../common/Loading'
import LoginUnsuccessful from '../Login/LoginUnsuccessful'

class Calendarweek extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentStartDate: ''
    }

    const currentDate = new Date()
    let daysIndex = currentDate.getDay()

    if (daysIndex == 0) {
      daysIndex = 7
    }
    const startNextWeek = new Date(currentDate)
    startNextWeek.setDate(startNextWeek.getDate() - daysIndex + 1 + 7)
    this.state.currentStartDate = new Date(startNextWeek)

    this.props.BookingAvailability(startNextWeek)
  }

  render () {
    if (this.props.unauthorized) {
      return <LoginUnsuccessful />
    } else if (this.props.isLoading) {
      return <Loading title='A carregar visao Semanal...' />
    } else if (this.props.hasErrored) {
      return (
        <div className='alert alert-danger alert-dismissible fade show'>
          <h1>Falha ao ler os dados: {this.props.errorMessage}</h1>
        </div>
      )
    } else {
      return (
        <div>
          <Container
            isLoadingCalendar={this.props.isLoadingCalendar}
            booking={this.props.bookingweek}
            textheader={this.props.textheader}
            dispatchUpdateTextFooter={newDate => {
              this.props.dispatchUpdateTextFooter(newDate)
            }}
            dispatchUpdateFilterListAvailability={newDate => {
              this.props.dispatchUpdateFilterListAvailability(newDate)
              this.state.currentStartDate = newDate
            }}
            dispatchUpdateTextHeader={newDate => {
              this.props.dispatchUpdateTextHeader(newDate)
            }}
          />
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    textheader: state.calendar.textheader,
    textfooter: state.calendar.textfooter,
    bookingweek: state.booking.bookingweek,
    // customers: state.customers.data,
    // services: state.services.data,
    hasErrored: state.calendar.hasErrored,
    isLoading: state.booking.isLoading,
    isLoadingCalendar: state.booking.isLoadingCalendar,
    errorMessage: state.calendar.errorMessage,
    unauthorized: state.login.unauthorized
  }
}

export default {
  component: connect(mapStateToProps, {
    dispatchUpdateTextFooter,
    dispatchUpdateTextHeader,
    dispatchUpdateFilterListAvailability,
    FetchData,
    BookingAvailability
  })(Calendarweek)
}
