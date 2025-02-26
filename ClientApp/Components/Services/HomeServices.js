import React, { Component } from 'react'
import ServicesRec from './ServicesRec'

class HomeServices extends Component {
  delete = service => {
    return this.props.delete(service)
  }

  render () {
    const itemComponents = this.props.services.map(Rec => {
      return (
        <ServicesRec
          key={Rec.id}
          service={Rec}
          delete={service => {
            return this.props.delete(service)
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
            <p>Sem servicos</p>
          </div>
        )}
      </div>
    )
  }
}

export default HomeServices
