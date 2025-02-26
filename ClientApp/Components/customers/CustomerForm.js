import React from 'react'
import TextInput from '../common/TextInput'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'

function CustomerForm (props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id='name'
        label='Nome'
        name='name'
        value={props.customer.name}
        onChange={props.onChange}
        error={props.errors.name}
      />
      <TextInput
        id='email'
        label='Email'
        name='email'
        value={props.customer.email}
        onChange={props.onChange}
        error={props.errors.email}
      />

      {/* <TextInput
        id='phone'
        label='Telemóvel'
        name='phone'
        value={props.customer.phone}
        onChange={props.onChange}
        error={props.errors.phone}
      /> */}
      <TextInput
        id='sendsms'
        label='Enviar Marcações por SMS '
        name='sendsms'
        checked={props.customer.sendsms}
        onChange={props.onChangeCheckbox}
        error={props.errors.sendsms}
        type='checkbox'
      />
      <TextInput
        id='birth'
        label='Data de Nascimento'
        name='birth'
        //value={new Date().toLocaleDateString('pt-PT', DATE_OPTIONS)}
        value={props.customer.birth}
        onChange={props.onChange}
        error={props.errors.birth}
        placeholder='aaaa-mm-dd'
      />
      <TextInput
        id='coloracao'
        label='Descricao 1'
        name='coloracao'
        value={props.customer.coloracao}
        onChange={props.onChange}
        error={props.errors.coloracao}
      />
      <TextInput
        id='descricao'
        label='Descricao 2'
        name='descricao'
        value={props.customer.descricao}
        onChange={props.onChange}
        error={props.errors.descricao}
      />
      <Link
        to={{
          pathname: '/customers/'
        }}
      >
        <button className='btn btn-outline-warning btn-cancel-customer'>
          Cancelar
        </button>
      </Link>
      <input
        type='submit'
        value='Salvar'
        className='btn btn-primary btn-customer'
      />
    </form>
  )
}

CustomerForm.propTypes = {
  customer: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeCheckbox: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
}

export default CustomerForm
