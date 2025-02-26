import React, { Component } from 'react'
import Container from './AcompanhamentoContainer'
import { connect } from 'react-redux'
import Loading from '../common/Loading'
import LoginUnsuccessful from '../Login/LoginUnsuccessful'

class Acompanhamento extends Component {
  render () {
    if (this.props.unauthorized) {
      return <LoginUnsuccessful />
    } else if (this.props.isLoading) {
      return <Loading title='A carregar Acompanhamentos...' />
    } else if (this.props.hasErrored) {
      return (
        <div className='alert alert-danger alert-dismissible fade show'>
          <h1>Falha ao ler as Acompanhamentos: {this.props.errorMessage}</h1>
        </div>
      )
    } else {
      return (
        <div>
          <Container
            services={this.props.services}
            customers={this.props.customers}
            booking={this.props.booking}
          />
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    customers: state.customers.data,
    booking: state.booking.data,
    services: state.services.data,
    hasErrored: state.booking.hasErrored,
    isLoading: state.booking.isLoading,
    errorMessage: state.booking.errorMessage,
    unauthorized: state.login.unauthorized
  }
}

export default {
  component: connect(mapStateToProps)(Acompanhamento)
}
