import React from 'react'
import TextInput from '../common/TextInput'
import { Link } from 'react-router-dom'

function ServiceForm (props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id='name'
        label='Nome'
        name='name'
        value={props.service.name}
        onChange={props.onChange}
        error={props.errors.name}
      />
      <TextInput
        id='diasAcompanhamento'
        label='Dias para acompanhamento'
        name='diasAcompanhamento'
        value={props.service.diasAcompanhamento}
        onChange={props.onChange}
        error={props.errors.diasAcompanhamento}
      />
      <TextInput
        id='seguirColoracao'
        label='Ver historico de coloracao'
        name='seguirColoracao'
        checked={props.service.seguirColoracao}
        onChange={props.onChangeCheckbox}
        error={props.errors.seguirColoracao}
        type='checkbox'
        
      />
      <Link
        to={{
          pathname: '/services/'
        }}
      >
        <button className='btn btn-outline-warning btn-cancel-service'>
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

export default ServiceForm
