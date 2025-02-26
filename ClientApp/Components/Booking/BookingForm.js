import React from 'react'
import MultiSelectDrop from '../common/MultiSelectDrop'
import DateInput from '../common/DateInput'
import { HeaderCalendar } from '../Calendar/HeaderCalendar'
import { HeaderTextCalendar } from '../Calendar/HeaderTextCalendar'
import { FooterCalendar } from '../Calendar/FooterCalendar'
import { Link } from 'react-router-dom'
import TextInput from '../common/TextInput'
import SelectDrop from '../common/SelectDrop'
import Loading from '../common/Loading'

function getCustomer (customerList, id) {
  if (!id) {
    return []
  }
  return customerList.filter(x => x.id == id)
}

function getServices (serviceList, ids) {
  return serviceList.filter(item => ids.includes(item.id))
}

function getColoracao (customer) {
  if (customer.length == 0) {
    return ''
  }
  return customer[0].coloracao
}

function getDescricao (customer) {
  if (customer.length == 0) {
    return ''
  }
  return customer[0].descricao
}

function getHistoricoColoracao (
  bookingList,
  allServices,
  customerSelected,
  servicesSelected
) {
  if (servicesSelected.length == 0 || customerSelected.length == 0) {
    return []
  }

  let servicesIdSelectedArray = servicesSelected.map(x => x.id)

  let historicoBooks = bookingList.filter(
    x => x.customerId == customerSelected[0].id
  )

  let returnArray = []
  const optionsMarcacao = { month: 'long', day: 'numeric' }

  historicoBooks.forEach(book => {
    book.services.forEach(serviceIdBooked => {
      let service = allServices.filter(x => x.id == serviceIdBooked)
      if (service[0].seguirColoracao) {
        if (book.coloracao && book.coloracao.length > 0) {
          let dataMarcacao = new Date(book.start)
          let tobeAdded = {
            name:
              dataMarcacao.toLocaleDateString('pt-PT', optionsMarcacao) +
              ': ' +
              book.coloracao +
              ' (' +
              service[0].name +
              ')',
            value: book.coloracao
          }

          returnArray.push(tobeAdded)
        }
      }
    })
  })

  return returnArray
}

function BookingForm (props) {
  const customerSelected = getCustomer(
    props.customers,
    props.booking.customerId
  )
  const servicesSelected = getServices(props.services, props.booking.services)

  const coloracaoFromcustomerSelected = getColoracao(customerSelected)

  const descricaoFromcustomerSelected = getDescricao(customerSelected)

  const historicoColoracaoArray = getHistoricoColoracao(
    props.bookings,
    props.services,
    customerSelected,
    servicesSelected
  )

  let customerSelectedIndex = -1

  if (customerSelected.length > 0) {
    customerSelectedIndex = props.customers.indexOf(customerSelected[0])
  }

  function handleClick (e) {
    e.preventDefault()
    props.onChange(e)
  }

  function onSelectCustomer (e) {
    props.onSelectCustomer(e)
  }

  function onSelectService (e) {
    props.onSelectService(e)
  }

  let showColoracaoInfo = servicesSelected.some(x => x.seguirColoracao)

  let divHistColoracao
  let divNovaColoracao
  if (servicesSelected.length > 0 && showColoracaoInfo) {
    divHistColoracao = (
      <MultiSelectDrop
        onSelect={props.onSelectHistoricoColoracao}
        selectedValue={props.booking.coloracao}
        placeholder={'Historico de Coloracoes'}
        label='Historico de Coloracoes'
        options={historicoColoracaoArray}
        singleSelect={true}
        displayValue={'name'}
        placeholder='Consultar aqui...'
      ></MultiSelectDrop>
    )

    divNovaColoracao = (
      <TextInput
        id='coloracao'
        label='Coloracao'
        name='coloracao'
        value={props.booking.coloracao}
        onChange={props.onColoracaoChange}
        error={props.errors.coloracao}
        type='text'
      />
    )
  }
  let divBookingRecursive
  if (props.booking.id == null) {
    divBookingRecursive = (
      <TextInput
        id='bookrecursive'
        label='Marcar mais 3 semanas'
        name='bookrecursive'
        checked={props.booking.bookrecursive}
        onChange={props.onChangeCheckbox}
        error={props.errors.bookrecursive}
        type='checkbox'
      />
    )
  }

  let showHtml
  if (props.isLoading) {
    showHtml = <Loading title='A Gravar marcacao...' />
  } else {
    showHtml = (
      <form onSubmit={props.onSubmit}>
        <SelectDrop
          label='Cliente'
          placeholder={'Selecionar Cliente'}
          onSelect={onSelectCustomer}
          options={props.customers}
          error={props.errors.customerId}
          selectedIndex={customerSelectedIndex}
        />

        {/* <MultiSelectDrop
        onSelect={onSelectCustomer}
        selectedValue={customerSelected}
        placeholder={'Selecionar Cliente '}
        label='Cliente'
        options={props.customers}
        singleSelect={true}
        displayValue={'name'}
        error={props.errors.customerId}
      ></MultiSelectDrop> */}

        <MultiSelectDrop
          error={props.errors.services}
          onRemove={onSelectService}
          onSelect={onSelectService}
          selectedValue={servicesSelected}
          placeholder={'Selecionar Servico'}
          label='Servicos'
          options={props.services}
          singleSelect={false}
          displayValue={'name'}
        ></MultiSelectDrop>
        {divHistColoracao}
        {divNovaColoracao}
        <div className='form-group'>
          {}
          <label className='multiselectlabel' htmlFor={props.displayValue}>
            Data
          </label>
          <div>
            <HeaderTextCalendar
              className='headertextcalendar'
              textheader={props.textheader}
            />
          </div>
          <div>
            <HeaderCalendar
              selectedDay={props.booking.start}
              //calendar={props.calendar}
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
          <div>
            <DateInput
              id='start'
              label='Inicio'
              name='start'
              value={props.booking.start}
              onChange={handleClick}
              error={props.errors.start}
              showDate='0'
            />
            <DateInput
              id='end'
              label='Fim'
              name='end'
              value={props.booking.end}
              onChange={props.onChange}
              error={props.errors.end}
              showDate='0'
            />
          </div>
          {divBookingRecursive}
        </div>
        <Link
          to={{
            pathname: '/booking/'
          }}
        >
          <button className='btn btn-outline-warning btn-cancel-booking'>
            Cancelar
          </button>
        </Link>
        <input
          disabled={props.disablesubmit}
          type='submit'
          value='Salvar'
          className='btn btn-primary btn-customer'
        />
      </form>
    )
  }

  return <div>{showHtml}</div>
}

export default BookingForm
