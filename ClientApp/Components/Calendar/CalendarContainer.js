import React from 'react'
import HeaderTitle from '../common/HeaderTitle'
import Home from './HomeCalendar'

import { HeaderCalendar } from './HeaderCalendar'
import { HeaderTextCalendar } from './HeaderTextCalendar'
import { FooterCalendar } from './FooterCalendar'
import AddWithParameter from '../common/AddWithParameter'

export default function CalendarContainer (props) {
  return (
    <div className='container-main'>
      <div className='row'>
        <div className='col-12'>
          <HeaderTitle title='Calendario' />
          <AddWithParameter
            title='Marcacao'
            linkto='/addbooking/'
            value={props.selecteddate}
          />
          <div>
            <HeaderTextCalendar textheader={props.textheader} />
          </div>
          <div>
            <HeaderCalendar
              calendar={props.calendar}
              dispatchUpdateTextFooter={newDate => {
                props.dispatchUpdateTextFooter(newDate)
              }}
              dispatchUpdateTextHeader={newDate => {
                props.dispatchUpdateTextHeader(newDate)
              }}
            />
          </div>
          <div className='calendar-headertextfooter'>
            <FooterCalendar textfooter={props.textfooter} />
          </div>
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
