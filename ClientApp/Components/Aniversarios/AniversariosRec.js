import React, { Component } from 'react'

export default class AniversariosRec extends Component {
  render () {
    return (
      <div className='events-customers-list__item row'>
        <div className='item col-12 col-sm-6 col-md-5 '>
          <div className='customer-title'>{this.props.customer.name}</div>
          <div className='customer-details'>
            <i>&nbsp;&nbsp;Contato: </i>
            {this.props.customer.phone}
          </div>
          <div className='customer-details'>
            <i>&nbsp;&nbsp;Faz hoje: </i>
            {this.props.year}
          </div>
        </div>
      </div>
    )
  }
}
