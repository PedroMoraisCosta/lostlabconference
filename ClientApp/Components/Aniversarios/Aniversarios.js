import React, { Component } from 'react'
import Container from './AniversariosContainer'
import { connect } from 'react-redux'
import Loading from '../common/Loading'
import LoginUnsuccessful from '../Login/LoginUnsuccessful'

class Aniversarios extends Component {
  render () {
    if (this.props.unauthorized) {
      return <LoginUnsuccessful />
    } else if (this.props.isLoading) {
      return <Loading title='A carregar Aniversarios...' />
    } else if (this.props.hasErrored) {
      return (
        <div className='alert alert-danger alert-dismissible fade show'>
          <h1>Falha ao ler os Aniversarios: {this.props.errorMessage}</h1>
        </div>
      )
    } else {
      return (
        <div>
          <Container aniversarios={this.props.customers} />
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    customers: state.customers.data,
    hasErrored: state.customers.hasErrored,
    isLoading: state.customers.isLoading,
    errorMessage: state.customers.errorMessage,
    unauthorized: state.login.unauthorized
  }
}

export default {
  component: connect(mapStateToProps)(Aniversarios)
}
