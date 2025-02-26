import React, { Component } from 'react'
import Container from './ServicesContainer'
import { connect } from 'react-redux'
import { FetchData, Bdelete } from '.././../../redux/actions/services'
import Loading from '../common/Loading'
import LoginUnsuccessful from '../Login/LoginUnsuccessful'
import { ServicesFetchData } from '.././../../redux/actions/services'

class Services extends Component {
  componentDidMount () {
    if (!this.props.unauthorized) {
      this.props.ServicesFetchData()
    }
  }
  render () {
    if (this.props.unauthorized) {
      return <LoginUnsuccessful />
    } else if (this.props.isLoading) {
      return <Loading title='A carregar Servicos...' />
    } else if (this.props.hasErrored) {
      return (
        <div className='alert alert-danger alert-dismissible fade show'>
          <h1>Falha ao ler os Servicos: {this.props.errorMessage}</h1>
        </div>
      )
    } else {
      return (
        <div>
          <Container
            services={this.props.services}
            delete={service => {
              let serviceInUse = false
              for (var i = 0, b; (b = this.props.booking[i]); i++) {
                if (b.services.includes(service.id)) {
                  serviceInUse = true
                  break
                }
              }

              // this.props.booking.forEach(b => {
              //   if (b.services.includes(service.id)) {
              //     serviceInUse = true
              //     break
              //   }
              // b.services.forEach(element => {
              //   if (element.Id == service.id) {
              //     serviceInUse = true
              //   }
              // })
              //})

              if (!serviceInUse) {
                this.props.Bdelete(service)
              } else {
                console.log('Servico em uso numa marcacao')
              }
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
    services: state.services.data,
    hasErrored: state.services.hasErrored,
    isLoading: state.services.isLoading,
    errorMessage: state.services.errorMessage,
    unauthorized: state.login.unauthorized
  }
}

export default {
  component: connect(mapStateToProps, {
    ServicesFetchData,
    FetchData,
    Bdelete
  })(Services)
}
