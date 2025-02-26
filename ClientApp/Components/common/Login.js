import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import LoginForm from '../Login/LoginForm'
import { loginCall } from '.././../../redux/actions/login'

export const Login = props => {
  const [errors, setErrors] = useState({})
  const [login, setLogin] = useState({
    user: 'Margarida',
    pass: '',
    unauthorized: props.unauthorized
  })

  function handleSubmit (event) {
    event.preventDefault()
    if (!formIsValid()) return
    const prom1 = props.loginCall(login)
    Promise.all([prom1])
      .then(() => {
        props.history.push('/customers')
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
    if (!login.user) _errors.user = 'Utilizador obrigat\u00F3rio'

    if (!login.pass) _errors.pass = 'Password obrigat\u00F3ria'

    setErrors(_errors)
    return Object.keys(_errors).length === 0
  }

  return (
    <LoginForm
      login={login}
      onSubmit={handleSubmit}
      onChange={handleChange}
      errors={errors}
    />
  )
}

function loadData () {
  return promise.resolve()
}

Login.propTypes = {}
Login.defaultProps = {}

function mapStateToProps (state) {
  return {
    login: state.login,
    unauthorized: state.login.unauthorized
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
