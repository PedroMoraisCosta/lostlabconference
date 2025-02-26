import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { toStringDate } from '../ToStringComponent'

export default class BookingRec extends Component {
  render () {
    function getCustomer (customerList, id) {
      const customer = customerList.filter(x => x.id == id)
      return customer
    }

    function getServiceName (serviceList, ids) {
      const services = serviceList.filter(item => ids.includes(item.id))

      let names = ''
      services.forEach(element => {
        names = names + element.name + ', '
      })

      return names.slice(0, -2)
    }

    const optionsMarcacao = { weekday: 'long', month: 'long', day: 'numeric' }
    const optionsStartEnd = { hour: 'numeric', minute: 'numeric' }
    let dataMarcacao = new Date(this.props.book.start)
    let dataStart = new Date(this.props.book.start)
    let dataEnd = new Date(this.props.book.end)

    const customer = getCustomer(
      this.props.customers,
      this.props.book.customerId
    )
    const customerName = customer[0].name

    const serviceName = getServiceName(
      this.props.services,
      this.props.book.services
    )

    let showColoracaoInfo = this.props.services
      .filter(item => this.props.book.services.includes(item.id))
      .some(x => x.seguirColoracao)

    let divColoracao
    if (showColoracaoInfo) {
      divColoracao = (
        <div className='customer-details'>
          Coloracao: <b>{this.props.book.coloracao}</b>
        </div>
      )
    }

    let showData = this.props.showData
    let divData
    if (showData)
      divData = (
        <div className='customer-title'>
          {dataMarcacao.toLocaleDateString('pt-PT', optionsMarcacao)}
        </div>
      )

    return (
      <div className='events-customers-list__item row'>
        <div className='item col-12 '>
          {divData}
          <div className='customer-details'>
            &nbsp;&nbsp; Inicio:{' '}
            <b>{dataStart.toLocaleTimeString('pt-PT', optionsStartEnd)}</b>{' '}
            &nbsp;&nbsp;&nbsp;Fim:{' '}
            <b>{dataEnd.toLocaleTimeString('pt-PT', optionsStartEnd)}</b>
          </div>
          <div className='customer-details'>
            Cliente: <b>{customerName}</b>
          </div>
          {divColoracao}
          <div className='customer-details'>
            Servicos: <b>{serviceName}</b>
          </div>

          <div>
            <button
              className='btn btn-outline-danger customerRec'
              onClick={() => this.props.delete(this.props.book)}
            >
              Apagar
            </button>
            <Link
              to={{
                pathname: '/booking/' + this.props.book.id,
                param1: this.props.book.id
              }}
            >
              <button className='btn btn-outline-primary customerRec'>
                Editar
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

//       <div className='events-customers-list__item'>
//         <div className='container-flex'>
//           <div className='row col-12 col-sm-12 col-md-12 '>{divData}</div>
//           <div className='row col-12 col-sm-12 col-md-12 '>
//             <div className='booking-rec-details-align-right col-2 col-sm-2 col-md-2'>
//               Inicio:
//             </div>
//             <div className='booking-rec-details-align-left col-4 col-sm-4 col-md-4'>
//               <b>{dataStart.toLocaleTimeString('pt-PT', optionsStartEnd)}</b>{' '}
//             </div>
//             <div className='booking-rec-details-align-right col-2 col-sm-2 col-md-2'>
//               Fim:
//             </div>
//             <div className='booking-rec-details-align-left col-4 col-sm-4 col-md-4'>
//               <b>{dataEnd.toLocaleTimeString('pt-PT', optionsStartEnd)}</b>
//             </div>
//           </div>
//           <div className='row col-12 col-sm-12 col-md-12 '>
//             <div className='booking-rec-details-align-right col-2 col-sm-2 col-md-2'>
//               Cliente:
//             </div>
//             <div className='booking-rec-details-align-left col-4 col-sm-4 col-md-4'>
//               <b>{customerName}</b>
//             </div>
//             <div className='booking-rec-details-align-right col-2 col-sm-2 col-md-2'>
//               Coloracao:
//             </div>
//             <div className='booking-rec-details-align-left col-4 col-sm-4 col-md-4'>
//               <b>{coloracao}</b>
//             </div>
//           </div>
//           <div className='row col-12 col-sm-12 col-md-12'>
//             <div className='booking-rec-details-align-right col-2 col-sm-2 col-md-2'>
//               Servicos:
//             </div>
//             <div className='booking-rec-details-align-left col-10 col-sm-10 col-md-10'>
//               <b>{serviceName}</b>
//             </div>
//           </div>

//           <div>
//             <button
//               className='btn btn-outline-danger customerRec'
//               onClick={() => this.props.delete(this.props.book)}
//             >
//               Apagar
//             </button>
//             <Link
//               to={{
//                 pathname: '/booking/' + this.props.book.id,
//                 param1: this.props.book.id
//               }}
//             >
//               <button className='btn btn-outline-primary customerRec'>
//                 Editar
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }
