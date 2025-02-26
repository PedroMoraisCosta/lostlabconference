import React from 'react'
import TextInput from '../common/TextInput'

function LoginForm (props) {
  return (
    <form onSubmit={props.onSubmit}>
      <TextInput
        id='user'
        label='Utilizador'
        name='user'
        value={props.login.user}
        onChange={props.onChange}
        error={props.errors.user}
      />
      <TextInput
        type='password'
        id='pass'
        label='Password'
        name='pass'
        value={props.login.pass}
        onChange={props.onChange}
        error={props.errors.pass}
      />
      <input
        type='submit'
        value='Entrar'
        className='btn btn-primary btn-customer'
      />
    </form>
  )
}

export default LoginForm
