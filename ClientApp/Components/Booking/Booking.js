import React, { Component } from 'react'
import Container from './BookingContainer'
import { connect } from 'react-redux'
import {
  FetchData,
  Bdelete,
  searchChange
} from '.././../../redux/actions/booking'
import Loading from '../common/Loading'
import LoginUnsuccessful from '../Login/LoginUnsuccessful'
import { ServicesFetchData } from '.././../../redux/actions/services'

class Booking extends Component {
  componentDidMount () {
    if (!this.props.unauthorized) {
      this.props.ServicesFetchData()
    }
  }
  render () {
    if (this.props.unauthorized) {
      return <LoginUnsuccessful />
    } else if (this.props.isLoading) {
      return <Loading title='A carregar Marcacoes...' />
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
            isLoading={this.props.isLoading}
            services={this.props.services}
            customers={this.props.customers}
            booking={this.props.booking}
            delete={book => {
              this.props.Bdelete(book)
            }}
            searchChange={searchtext => {
              this.props.searchChange(searchtext, this.props.customers)
            }}
          />
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    customers: state.customers.data,
    booking: state.booking.filteredbyname,
    services: state.services.data,
    hasErrored: state.booking.hasErrored,
    isLoading: state.booking.isLoading,
    errorMessage: state.booking.errorMessage,
    unauthorized: state.login.unauthorized
  }
}

// function loadData (booking) {
//   // wait for both retrieves to finish when server side renderings
//   const prom1 = booking.dispatch(FetchData())
//   return Promise.all([prom1])
// }

export default {
  component: connect(mapStateToProps, {
    ServicesFetchData,
    FetchData,
    Bdelete,
    searchChange
  })(Booking)
}
