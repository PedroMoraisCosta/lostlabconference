import React, { Component } from 'react'
import AniversariosRec from './AniversariosRec'

class HomeAniversarios extends Component {
  render () {
    let itemComponents = []
    if (this.props.aniversarios) {
      const currentDate = new Date()
      itemComponents = this.props.aniversarios.map(Rec => {
        if (Rec.birth != null) {
          let dateBirth = new Date(Rec.birth)
          if (
            dateBirth.getMonth() == currentDate.getMonth() &&
            dateBirth.getDate() == currentDate.getDate()
          ) {
            return (
              <AniversariosRec
                key={Rec.id}
                customer={Rec}
                year={currentDate.getFullYear() - dateBirth.getFullYear()}
              />
            )
          }
        }
      })
      if (itemComponents.filter(x => x != undefined).length == 0)
        itemComponents = []
    }

    return (
      <div className='events-customers-list container-fluid js-list-view active'>
        {itemComponents.length ? (
          itemComponents
        ) : (
          <div className='emptyList'>
            <p>Sem aniversariantes hoje</p>
          </div>
        )}
      </div>
    )
  }
}

export default HomeAniversarios
