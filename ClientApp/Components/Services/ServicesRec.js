import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { toStringDate } from '../common/ToStringComponent'

export default class ServicesRec extends Component {
  render () {
    let divData
    if (this.props.service.diasAcompanhamento > 0)
      divData = (
        <div className='customer-details'>
          &nbsp;&nbsp; Dias para acompanhamento:{' '}
          <b> {this.props.service.diasAcompanhamento}</b>
        </div>
      )
    let divColoracao
    if (this.props.service.seguirColoracao)
      divColoracao = (
        <div className='customer-details'>
          &nbsp;&nbsp; Ver historico de coloracao: <b> Sim</b>
        </div>
      )
    return (
      <div className='events-customers-list__item row'>
        <div className='item col-12 col-sm-6 col-md-5 '>
          <div className='customer-title'>{this.props.service.name}</div>
          {divData}
          {divColoracao}
          <div>
            <button
              className='btn btn-outline-danger customerRec'
              onClick={() => this.props.delete(this.props.service)}
            >
              Apagar
            </button>
            <Link
              to={{
                pathname: '/services/' + this.props.service.id,
                param1: this.props.service.id
              }}
            >
              <button className='btn btn-outline-primary customerRec'>
                Editar
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
