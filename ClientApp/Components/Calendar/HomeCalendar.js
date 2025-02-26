import React, { Component } from 'react'
import BookingRec from '../common/Booking/BookingRec'

class HomeCalendar extends Component {
  delete = book => {
    return this.props.delete(book)
  }

  render () {
    let orderedBooking = this.props.booking
    if (this.props.booking.length > 0) {
      orderedBooking = this.props.booking.sort(function (b1, b2) {
        return new Date(b1.date) - new Date(b2.date)
      })
    }

    const itemComponents = orderedBooking.map(Rec => {
      return (
        <BookingRec
          showData={false}
          key={Rec.id}
          book={Rec}
          services={this.props.services}
          customers={this.props.customers}
          delete={book => {
            return this.props.delete(book)
          }}
        />
      )
    })

    return (
      <div className='events-customers-list container-fluid js-list-view active'>
        {itemComponents.length ? (
          itemComponents
        ) : (
          <div className='emptyList'>
            <p>Sem marcacoes para este dia</p>
          </div>
        )}
      </div>
    )
  }
}

export default HomeCalendar
