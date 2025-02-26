import React from 'react'
import HeaderTitle from '../common/HeaderTitle'
import Home from './HomeAcompanhamento'

export default function AcompanhamentoContainer (props) {
  return (
    <div className='container-main'>
      <div className='row'>
        <div className='col-12'>
          <HeaderTitle title='Acompanhamento' />
          <Home
            services={props.services}
            customers={props.customers}
            booking={props.booking}
          />
        </div>
      </div>
    </div>
  )
}
