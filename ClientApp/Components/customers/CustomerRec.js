import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { toStringDate } from '../common/ToStringComponent'

export default class CustomerRec extends Component {
  render () {
    return (
      <div className='events-customers-list__item row'>
        <div className='item col-12 col-sm-12 col-md-12 '>
          <div className='customer-title'>{this.props.customer.name}</div>
          {/* <div className='customer-details'>
            <i>&nbsp;&nbsp;Contato: </i>
            {this.props.customer.phone}
          </div> */}
          <div className='customer-details'>
            <i>&nbsp;&nbsp; Email: </i> {this.props.customer.email}
          </div>

          <div className='customer-details'>
            <i>&nbsp;&nbsp;Data de Nascimento: </i>
            {toStringDate(this.props.customer.birth)}
          </div>
          <div className='customer-details'>
            <i>&nbsp;&nbsp;Coloracao: </i>
            {this.props.customer.coloracao}
          </div>
          <div className='customer-details'>
            <i>&nbsp;&nbsp;Descricao: </i>
            {this.props.customer.descricao}
          </div>
          <div>
            <button
              className='btn btn-outline-danger customerRec'
              onClick={() => this.props.deleteCustomer(this.props.customer)}
            >
              Apagar
            </button>
            <Link
              to={{
                pathname: '/customer/' + this.props.customer.id,
                param1: this.props.customer.id
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
