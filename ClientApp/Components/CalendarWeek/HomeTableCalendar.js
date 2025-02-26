import React, { Component } from 'react'
import TableCalendar from './TableCalendar'

class HomeTableCalendar extends Component {
  render () {
    let itemComponents = this.props.booking
    return (
      <div>
        {itemComponents.length ? (
          <TableCalendar
            isLoadingCalendar={this.props.isLoadingCalendar}
            items={itemComponents}
          />
        ) : (
          <div className='emptyList'>
            <p>Calendario Sem dados </p>
          </div>
        )}
      </div>
    )
  }
}

export default HomeTableCalendar
