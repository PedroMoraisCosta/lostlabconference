import React from 'react'
import HeaderTitle from '../common/HeaderTitle'
import Home from './HomeServices'
import Add from '../common/Add'


export default function ServicesContainer (props) {
  return (
    <div className='container-main'>
      <div className='row'>
        <div className='col-12'>
          <HeaderTitle title='servicos' />
          <Add title='Servicos' linkto='/addservice/'/>
          <Home
            services={props.services}
            delete={service => {
              return props.delete(service)
            }}
          />
        </div>
      </div>
    </div>
  )
}
