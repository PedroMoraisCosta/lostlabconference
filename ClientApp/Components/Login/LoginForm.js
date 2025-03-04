import React from 'react'
import TextInput from '../common/TextInput'

function LoginForm (props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id='name'
        label=''
        name='name'
        value={props.login.name}
        onChange={props.onChange}
        error={props.errors.name}
      />
      <TextInput
        id='birth'
        label=''
        name='birth'
        value={props.login.birth}
        onChange={props.onChange}
        error={props.errors.birth}
      />
      <TextInput
        id='email'
        label=''
        name='email'
        value={props.login.email}
        onChange={props.onChange}
        error={props.errors.email}
      />
      <TextInput
        id='phone'
        label=''
        name='phone'
        value={props.login.phone}
        onChange={props.onChange}
        error={props.errors.phone}
      />
      <input
        type='submit'
        value='Registar'
        className='btn btn-primary btn-customer'
      />
    </form>
  )
}

export default LoginForm
