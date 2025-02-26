import React from 'react'
import HeaderTitle from '../common/HeaderTitle'
import Home from './HomeCustomers'
import { Link } from 'react-router-dom'
import Search from '../common/Search'

export default function CustomerContainer (props) {
  return (
    <div className='container-main'>
      <div className='row'>
        <div className='col-12'>
          <HeaderTitle title='Clientes' />
          <div className='customers-title'>
            <div className='filter-bar__more-filters col-12 d-flex align-items-center'>
              <span className='square-icon square-icon--primary '>
                <i className='fa fa-plus' aria-hidden='true' />
              </span>
              <Link className='filter-bar__more-filters__label' to='/customer'>
                Adicionar Clientes
              </Link>
            </div>
          </div>
          <Search
            placeHolder='Procurar cliente...'
            onChange={target => {
              return props.searchChange(target.target.value)
            }}
          />
          <Home
            customers={props.customers}
            deleteCustomer={customer => {
              return props.deleteCustomer(customer)
            }}
          />
        </div>
      </div>
    </div>
  )
}
