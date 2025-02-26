import React, { Component } from 'react'
import Container from './CustomerContainer'
import { connect } from 'react-redux'
import {
  customersFetchData,
  deleteCustomer,
  searchChange
} from '.././../../redux/actions/customers'

import { BookingFetchData, Bdelete } from '.././../../redux/actions/booking'
//import { ServicesFetchData } from '.././../../redux/actions/services'
import Loading from '../common/Loading'
import LoginUnsuccessful from '../Login/LoginUnsuccessful'

class Customers extends Component {
  componentDidMount () {
    if (!this.props.unauthorized) {
      this.props.customersFetchData()
      this.props.BookingFetchData()
      //  this.props.ServicesFetchData()
    }
  }
  deleteCustomer (customer) {
    this.props.deleteCustomer(customer)
    // this.props.Bdelete(element)
  }

  render () {
    if (this.props.unauthorized) {
      return <LoginUnsuccessful />
    } else if (this.props.isLoading) {
      return <Loading title='A carregar Clientes...' />
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
            customers={this.props.customers}
            searchChange={searchtext => {
              this.props.searchChange(searchtext)
            }}
            deleteCustomer={customer => {
              const bookingsForCustomer = this.props.booking.filter(
                b => b.customerId == customer.id
              )

              bookingsForCustomer.forEach(element => {
                this.props.Bdelete(element)
              })

              this.props.deleteCustomer(customer)
            }}
          />
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    booking: state.booking.data,
    customers: state.customers.filteredbyname,
    hasErrored: state.customers.hasErrored,
    isLoading: state.customers.isLoading,
    errorMessage: state.customers.errorMessage,
    unauthorized: state.login.unauthorized
  }
}

// function loadData (customer) {
//   // wait for both retrieves to finish when server side renderings
//   const prom1 = customer.dispatch(customersFetchData())
//   return Promise.all([prom1])
// }

export default {
  component: connect(mapStateToProps, {
    //ServicesFetchData,
    BookingFetchData,
    customersFetchData,
    deleteCustomer,
    Bdelete,
    searchChange
  })(Customers)
}
