import React from 'react'
import PropTypes from 'prop-types'

function TextInput (props) {
  let wrapperClass = "form-group'"
  if (props.error.length > 0) {
    wrapperClass += ' has error'
  }
  let type = 'text'
  let css = 'form-control text'
  if (props.type) {
    type = props.type
  }
  if (props.type == 'checkbox') {
    css = 'form-control checkbox'
  }
  return (
    <div className={wrapperClass}>
      <label className='textinput' htmlFor={props.id}>
        {props.label}
      </label>
      <div className='field'>
        <input
          id={props.id}
          type={type}
          onChange={props.onChange}
          name={props.name}
          value={props.value}
          className={css}
          placeholder={props.placeholder}
          checked={props.checked}
        />
      </div>
      {props.error && (
        <div className='alert alert-danger text'>{props.error}</div>
      )}
    </div>
  )
}

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string
}

TextInput.defaultProps = {
  error: ''
}

export default TextInput
