import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

export const FooterCalendar = props => {
   return <div className='calendar-footer'>{props.textfooter}</div>
}