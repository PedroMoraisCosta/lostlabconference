import React from 'react'
import HeaderTitle from '../common/HeaderTitle'
import Home from './HomeBooking'
import Add from '../common/Add'
import Search from '../common/Search'
import Loading from '../common/Loading'

export default function BookingContainer (props) {
  let showHtml
  if (props.isLoading) {
    showHtml = <Loading title='A carregar marcacoes...' />
  } else {
    showHtml = (
      <div className='container-main'>
        <div className='row'>
          <div className='col-12'>
            <HeaderTitle title='marcacoes' />
            <Add title='Marcacao' linkto='/addbooking/' />
            <Search
              placeHolder='Procurar cliente...'
              onChange={target => {
                return props.searchChange(target.target.value)
              }}
            />
            <Home
              services={props.services}
              customers={props.customers}
              booking={props.booking}
              delete={book => {
                return props.delete(book)
              }}
            />
          </div>
        </div>
      </div>
    )
  }
  return <div>{showHtml}</div>
}
