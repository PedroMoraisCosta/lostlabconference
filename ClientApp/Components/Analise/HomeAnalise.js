import React, { Component } from 'react'
import AnaliseRec from '../Analise/AnaliseRec'

// export const HomeAnalise = props => {
//   const [bookingFiltered, setBook] = useState({})

//   useEffect(() => {
//     let orderedBooking = this.props.booking

//     if (this.props.booking.length > 0) {
//       orderedBooking = this.props.booking.sort(function (b1, b2) {
//         return new Date(b1.date) - new Date(b2.date)
//       })
//     }
//     const itemComponents = orderedBooking.map(Rec => {
//       return (
//         <AnaliseRec
//           showData={true}
//           key={Rec.id}
//           book={Rec}
//           customers={this.props.customers}
//           services={this.props.services}
//         />
//       )
//     })
//     setBook(itemComponents)

//     return
//   }, [bookingFiltered.length])

//   return (
//     <div className='events-customers-list container-fluid js-list-view active'>
//       {itemComponents.length ? (
//         itemComponents
//       ) : (
//         <div className='emptyList'>
//           <p>Sem marcacoes</p>
//         </div>
//       )}
//     </div>
//   )
// }

class HomeAnalise extends Component {
  render () {
    let orderedBooking = this.props.booking
    if (this.props.booking.length > 0) {
      orderedBooking = this.props.booking.sort(function (b1, b2) {
        return new Date(b1.date) - new Date(b2.date)
      })
    }
    const itemComponents = orderedBooking.map(Rec => {
      return (
        <AnaliseRec
          showData={true}
          key={Rec.id}
          book={Rec}
          customers={this.props.customers}
          services={this.props.services}
        />
      )
    })

    return (
      <div className='events-customers-list container-fluid js-list-view active'>
        {itemComponents.length ? (
          itemComponents
        ) : (
          <div className='emptyList'>
            <p>Não existem marcacoes superiores a data escolhida 30 dias</p>
          </div>
        )}
      </div>
    )
  }
}

export default HomeAnalise
