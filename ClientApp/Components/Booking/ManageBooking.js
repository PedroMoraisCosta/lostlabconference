import { connect } from 'react-redux'
import React, { useEffect, useState } from 'react'
import Form from './BookingForm'
import { Add, updateBooking } from '.././../../redux/actions/booking'

import {
  dispatchUpdateTextHeader,
  dispatchUpdateTextFooter
} from '.././../../redux/actions/calendar'

export const ManageBooking = props => {
  const [disablesubmit, setDisableSubmitBt] = useState(false)
  const [errors, setErrors] = useState({})
  const [row, setRow] = useState({
    id: null,
    start: new Date().toISOString(),
    customerId: '',
    services: [],
    end: new Date().toISOString(),
    bookrecursive: false,
    coloracao: ''
  })

  const months = [
    'Janeiro',
    'Fevereiro',
    'Marco',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]

  function handleChangeCheckbox (e) {
    const updatedRow = { ...row, [e.target.name]: e.target.checked }
    setRow(updatedRow)
  }

  function handleChange (e) {
    let newDate = new Date(row.start)
    newDate.setHours(e.target.value.substring(0, 2))
    newDate.setMinutes(e.target.value.substring(3, 5))

    const updatedRow = { ...row, [e.target.name]: newDate }
    setRow(updatedRow)
  }

  function coloracaoHandleChange (e) {
    const updatedRow = { ...row, [e.target.name]: e.target.value }
    setRow(updatedRow)
  }

  function onSelectCustomer (e) {
    const updatedRow = { ...row, customerId: e.id }
    setRow(updatedRow)
  }

  function onSelectService (e) {
    let result = e.map(a => a.id)
    const updatedRow = { ...row, services: result }
    setRow(updatedRow)
  }

  function onSelectHistoricoColoracao (e) {
    const updatedRow = { ...row, coloracao: e[0].value }
    setRow(updatedRow)
  }
  function updateStateDates (newDate) {
    let startDate = new Date(newDate)
    let endDate = new Date(newDate)
    const start = new Date(row.start)
    const end = new Date(row.end)

    startDate.setHours(start.getHours())
    startDate.setMinutes(start.getMinutes())

    endDate.setHours(end.getHours())
    endDate.setMinutes(end.getMinutes())

    let updatedRow = { ...row, start: startDate, end: endDate }

    setRow(updatedRow)
  }

  function handleSubmit (event) {
    event.preventDefault()
    if (!formIsValid()) return
    setDisableSubmitBt(true)
    if (!row.id) {
      const prom1 = props.Add(row)
      Promise.all([prom1])
        .then(() => {
          if (row.bookrecursive) {
            props.history.push('/customers')
          } else {
            props.history.push('/booking')
          }
        })
        .catch(() => {
          console.log('error on action')
          setDisableSubmitBt(false)
        })
    } else {
      const prom1 = props.Update(row)
      Promise.all([prom1])
        .then(() => {
          props.history.push('/booking')
        })
        .catch(() => {
          console.log('error on action')
          setDisableSubmitBt(false)
        })
    }
  }

  function formIsValid () {
    const _errors = {}
    if (!row.customerId) _errors.customerId = 'Cliente obrigat\u00F3rio'
    if (row.services.length == 0) _errors.services = 'Servico obrigat\u00F3rio'

    if (!row.start) _errors.start = 'Hora de inicio obrigat\u00F3rio'
    if (!row.end) _errors.end = 'Hora de fim obrigat\u00F3rio'

    //Validate start time with end time
    // let dateStart = new Date(row.start)
    // dateStart.setSeconds(1)
    // let dateEnd = new Date(row.end)
    // dateEnd.setSeconds(0)
    // if (dateEnd <= dateStart) {
    //   _errors.end = 'Hora de fim nao pode ser menor ou igual a hora de inicio'
    // }

    // let bookingSameDay = []
    // props.booking.data.forEach(b => {
    //   let bDate = new Date(b.start).toISOString().split('T')[0]
    //   let currentDate = new Date(dateStart).toISOString().split('T')[0]
    //   if (bDate == currentDate && b.id != row.id) {
    //     let bookingStart = new Date(b.start)
    //     bookingStart.setSeconds(0)
    //     //let bookingEnd = new Date(b.end)

    //     let bEnd = new Date(b.end)
    //     bEnd.setSeconds(0)
    //     let bookingEnd15minutes = new Date(bEnd.getTime() - 15 * 60 * 1000)
    //     let bookingStart15minutes = new Date(
    //       bookingStart.getTime() + 15 * 60 * 1000
    //     )
    //     //marcacao das 10 as 13 e uma ja existente 11 as 12
    //     if (
    //       dateStart < bookingStart &&
    //       dateEnd > bookingStart &&
    //       dateEnd < bEnd &&
    //       dateEnd > bookingStart15minutes
    //     ) {
    //       bookingSameDay.push(b)
    //     }
    //     //marcacao das 10 as 11 e uma ja existente 09:15(09) as 11:45.(12)
    //     if (
    //       dateStart >= bookingStart15minutes &&
    //       dateEnd <= bookingEnd15minutes
    //     ) {
    //       bookingSameDay.push(b)
    //     }
    //     //marcacao das 10 as 12 e uma ja existente 11 as 11:45.(12)
    //     if (dateStart <= bookingStart && dateEnd >= bookingEnd15minutes) {
    //       bookingSameDay.push(b)
    //     }
    //     //marcacao das 10:30 as 12 e uma ja existente 10:15(10) as 11.
    //     if (
    //       dateStart >= bookingStart15minutes &&
    //       dateStart < bookingEnd15minutes &&
    //       dateEnd >= bEnd
    //     ) {
    //       bookingSameDay.push(b)
    //     }
    //   }
    // })

    // if (bookingSameDay.length > 0) {
    //   const customer = props.customers.filter(
    //     x => x.id == bookingSameDay[0].customerId
    //   )[0]
    //   const currentDate = new Date(bookingSameDay[0].start)
    //   _errors.end =
    //     'Existe uma marcacao das ' +
    //     new Date(bookingSameDay[0].start)
    //       .toISOString()
    //       .split('T')[1]
    //       .substring(0, 5) +
    //     ' as ' +
    //     new Date(bookingSameDay[0].end)
    //       .toISOString()
    //       .split('T')[1]
    //       .substring(0, 5) +
    //     ' para o cliente ' +
    //     customer.name +
    //     ' neste dia ' +
    //     currentDate.getDate().toString() +
    //     ' de ' +
    //     months[currentDate.getMonth()]
    // }

    setErrors(_errors)
    return Object.keys(_errors).length === 0
  }

  useEffect(() => {
    const id = props.match.params.id
    const dateQueryString = props.match.params.date

    if (id) {
      let filteredArray = props.booking.filter(
        item => item.id.toString() === id.toString()
      )
      setRow(filteredArray[0])
    } else {
      let defaultDate = new Date()
      if (dateQueryString) {
        defaultDate = new Date(dateQueryString)
      }
      let defaultEndDate = new Date(defaultDate.getTime() + 1 * 60 * 60 * 1000)

      let row = {
        id: null,
        start: defaultDate.toISOString(),
        customerId: '',
        services: [],
        end: defaultEndDate.toISOString(),
        coloracao: '',
        bookrecursive: false
      }
      setRow(row)
    }
    return
  }, [props.match.params.id])

  // let showHtml
  // if (props.isLoading) {
  //   showHtml = <Loading title='A Gravar marcacao...' />
  // } else {
  //   showHtml = (

  //   )
  // }

  return (
    <div className='container-main'>
      <div className='row'>
        <div className='col-12'>
          <Form
            dispatchUpdateTextHeader={newDate => {
              props.dispatchUpdateTextHeader(newDate)
              //  updateStateDates(newDate)
            }}
            dispatchUpdateTextFooter={newDate => {
              props.dispatchUpdateTextFooter(newDate)
              updateStateDates(newDate)
            }}
            textfooter={props.textfooter}
            textheader={props.textheader}
            customers={props.customers}
            services={props.services}
            booking={row}
            bookings={props.booking}
            onSelectService={onSelectService}
            onSelectCustomer={onSelectCustomer}
            onChange={handleChange}
            onSubmit={handleSubmit}
            errors={errors}
            disablesubmit={disablesubmit}
            onColoracaoChange={coloracaoHandleChange}
            onSelectHistoricoColoracao={onSelectHistoricoColoracao}
            onChangeCheckbox={handleChangeCheckbox}
            isLoading={props.isLoading}
          />
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    Add: row => dispatch(Add(row)),
    Update: row => dispatch(updateBooking(row)),
    dispatchUpdateTextHeader: newDate =>
      dispatch(dispatchUpdateTextHeader(newDate)),
    dispatchUpdateTextFooter: newDate =>
      dispatch(dispatchUpdateTextFooter(newDate))
  }
}

function mapStateToProps (state) {
  return {
    textfooter: state.calendar.textfooter,
    textheader: state.calendar.textheader,
    services: state.services.data,
    customers: state.customers.data,
    booking: state.booking.data,
    isLoading: state.booking.isLoading
  }
}

export default {
  component: connect(mapStateToProps, mapDispatchToProps)(ManageBooking)
}
