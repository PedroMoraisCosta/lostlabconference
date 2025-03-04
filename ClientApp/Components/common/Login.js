import React, { Component, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import LoginForm from '../Login/LoginForm'
import { loginCall } from '.././../../redux/actions/login'
import Loading from '../common/Loading'

export const Login = props => {
  const [errors, setErrors] = useState({})
  const [login, setLogin] = useState({
    name: '',
    birth: '',
    email: '',
    phone: '',
    unauthorized: props.unauthorized
  })

  function handleSubmit (event) {
    event.preventDefault()
    if (!formIsValid()) return
    const prom1 = props.loginCall(login)
    Promise.all([prom1])
      .then(() => {
        props.history.push('/aniversarios')
      })
      .catch(() => {
        console.log('error on login')
      })
  }

  function handleChange ({ target }) {
    const updated = { ...login, [target.name]: target.value }
    setLogin(updated)
  }

  function formIsValid () {
    const _errors = {}
    if (!login.name) _errors.name = 'Nome obrigat\u00F3rio'

    if (!login.birth) _errors.birth = 'Data de Nascimento obrigat\u00F3rio'

    if (login.email) {
      if (
        !login.email.match(
          /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        )
      )
        _errors.email = 'Email inv\u00E1lido'
    } else {
      _errors.email = 'Email obrigat\u00F3rio'
    }

    if (login.phone) {
      if (!login.phone.toString().match(/^[0-9]{9}$/))
        _errors.phone = 'Telemóvel inv\u00E1lido'
    } else {
      _errors.phone = 'Telefone obrigat\u00F3rio'
    }
    setErrors(_errors)
    return Object.keys(_errors).length === 0
  }

  useEffect(() => {
    setLogin(prev => ({ ...prev, unauthorized: props.unauthorized }))
  }, [props.unauthorized])

  let showHtml
  if (props.isLoading) {
    showHtml = <Loading title='Em espera...' />
  } else if (props.hasErrored) {
    showHtml = (
      <div className='alert alert-danger alert-dismissible fade show'>
        <h1>Falha ao ler os dados: {props.errorMessage}</h1>
      </div>
    )
  } else {
    showHtml = (
      <LoginForm
        login={login}
        onSubmit={handleSubmit}
        onChange={handleChange}
        errors={errors}
      />
    )
  }

  return <div>{showHtml}</div>
}

function loadData () {
  return promise.resolve()
}

Login.propTypes = {}
Login.defaultProps = {}

function mapStateToProps (state) {
  return {
    login: state.login,
    unauthorized: state.login.unauthorized,
    hasErrored: state.login.hasErrored,
    isLoading: state.login.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loginCall: login => dispatch(loginCall(login))
  }
}

export default {
  component: connect(mapStateToProps, mapDispatchToProps)(Login),
  loadData
}
