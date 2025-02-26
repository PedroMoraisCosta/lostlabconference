import { connect } from 'react-redux'
import React, { useEffect, useState } from 'react'
import ServiceForm from './ServiceForm'
import { Add, Update } from '.././../../redux/actions/services'
import Loading from '../common/Loading'

export const ManageServicesPage = props => {
  const [errors, setErrors] = useState({})
  const [row, setRow] = useState({
    id: null,
    name: '',
    seguirColoracao: false
  })

  function handleChange ({ target }) {
    const updatedRow = { ...row, [target.name]: target.value }
    setRow(updatedRow)
  }

  function handleChangeCheckbox ({ target }) {
    const updatedRow = { ...row, [target.name]: target.checked }
    setRow(updatedRow)
  }

  function handleSubmit (event) {
    event.preventDefault()
    if (!formIsValid()) return
    if (!row.id) {
      const prom1 = props.Add(row)
      Promise.all([prom1])
        .then(() => {
          props.history.push('/services')
        })
        .catch(() => {
          console.log('error on action')
        })
    } else {
      const prom1 = props.Update(row)
      Promise.all([prom1])
        .then(() => {
          props.history.push('/services')
        })
        .catch(() => {
          console.log('error on action')
        })
    }
  }

  function formIsValid () {
    const _errors = {}
    if (!row.name) _errors.name = 'Nome obrigat\u00F3rio'
    if (!row.diasAcompanhamento) {
      row.diasAcompanhamento = 0
    }
    setErrors(_errors)
    return Object.keys(_errors).length === 0
  }

  useEffect(() => {
    const id = props.match.params.id

    if (id) {
      var filteredArray = props.services.data.filter(
        item => item.id.toString() === id.toString()
      )

      setRow(filteredArray[0])
    }
    return
  }, [props.match.params.id])
  let showHtml
  if (props.isLoading) {
    showHtml = <Loading title='A Gravar servico...' />
  } else {
    showHtml = (
      <ServiceForm
        service={row}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onChangeCheckbox={handleChangeCheckbox}
        errors={errors}
      />
    )
  }

  return <div>{showHtml}</div>
}

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    Add: row => dispatch(Add(row)),
    Update: row => dispatch(Update(row))
  }
}

function mapStateToProps (state) {
  return {
    services: state.services,
    isLoading: state.services.isLoading
  }
}

export default {
  component: connect(mapStateToProps, mapDispatchToProps)(ManageServicesPage)
}
