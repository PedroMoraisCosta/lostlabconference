import React, { Component } from 'react'

export default class AcompanhamentoRec extends Component {
  render () {
    function getCustomerName (customerList, id) {
      const customer = customerList.filter(x => x.id == id)
      return customer[0].name
    }

    function getServiceName (serviceList, ids) {
      const services = serviceList.filter(item => ids.includes(item.id))

      let names = ''
      services.forEach(element => {
        names = names + element.name + ', '
      })

      return names.slice(0, -2)
    }

    function getAcompanhamento (services, bookServices) {
      let acompanhamento = 0
      bookServices.forEach(element => {
        let servico = services.filter(item => item.id == element)
        acompanhamento = acompanhamento + servico[0].diasAcompanhamento
      })

      return acompanhamento
    }

    const optionsMarcacao = { month: 'long', day: 'numeric' }
    // const optionsStartEnd = { hour: 'numeric', minute: 'numeric' }
    const dataMarcacao = new Date(this.props.book.start)

    let acompanhamento = getAcompanhamento(
      this.props.services,
      this.props.book.services
    )

    let dataProximaMarcacao = new Date(this.props.book.start)
    dataProximaMarcacao.setDate(dataMarcacao.getDate() + acompanhamento)
    //let dataEnd = new Date(this.props.book.end)

    const customerName = getCustomerName(
      this.props.customers,
      this.props.book.customerId
    )

    const serviceName = getServiceName(
      this.props.services,
      this.props.book.services
    )

    // let showData = this.props.showData
    // let divData
    // if (showData)
    //   divData = (
    //     <div className='customer-title'>
    //       {dataMarcacao.toLocaleDateString('pt-PT', optionsMarcacao)}
    //     </div>
    //   )
    // {divData}

    {
      /* <div className='customer-details'>
      &nbsp;&nbsp; Inicio:{' '}
      <b>{dataStart.toLocaleTimeString('pt-PT', optionsStartEnd)}</b>{' '}
      &nbsp;&nbsp;&nbsp;Fim:{' '}
      <b>{dataEnd.toLocaleTimeString('pt-PT', optionsStartEnd)}</b>
    </div> */
    }
    return (
      <div className='events-customers-list__item row'>
        <div className='item col-12 col-sm-6 col-md-5 '>
          <div className='customer-details'>
            &nbsp;&nbsp; Cliente: <b>{customerName}</b>
          </div>
          <div className='customer-details'>
            &nbsp;&nbsp; Ultima Marcação:{' '}
            {dataMarcacao.toLocaleDateString('pt-PT', optionsMarcacao)}
          </div>
          <div className='customer-details'>
            &nbsp;&nbsp; Proxima Marcação:{' '}
            <b>
              {dataProximaMarcacao.toLocaleDateString('pt-PT', optionsMarcacao)}
            </b>
          </div>
          <div className='customer-details'>
            &nbsp;&nbsp; Servicos: {serviceName}
          </div>

          {/* <div>
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
            </div> */}
        </div>
      </div>
    )
  }
}
