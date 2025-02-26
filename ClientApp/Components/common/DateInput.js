import React from 'react'
import PropTypes from 'prop-types'

function DateInput (props) {
  let wrapperClass = "form-group'"
  if (props.error.length > 0) {
    wrapperClass += ' has error'
  }
  let data
  let time
  // let data = new Date()
  // let time = data.toLocaleTimeString('pt-PT', {
  //   hour: '2-digit',
  //   minute: '2-digit'
  // })

  if (props.value) {
    data = new Date(props.value).toISOString().split('T')[0]
    time = new Date(props.value).toLocaleTimeString('pt-PT', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  let showHtmlDate
  if (props.showDate == 0) {
    showHtmlDate = <div></div>
  } else {
    showHtmlDate = (
      <div>
        <label className='textinput' htmlFor={props.id}>
          {props.label}
        </label>
        <div className='field'>
          <input
            id={props.id}
            type='date'
            name='bday'
            max='2050-12-31'
            min='2019-12-31'
            className='form-control text'
            onChange={props.onChange}
            name={props.name}
            value={data}
            //   placeholder={props.placeholder}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={wrapperClass}>
      {showHtmlDate}
      <div className='field'>
        <input
          id={props.id}
          type='time'
          name='bday'
          className='form-control text'
          onChange={props.onChange}
          name={props.name}
          value={time}
          //   placeholder={props.placeholder}
        />
      </div>
      {props.error && (
        <div className='alert alert-danger text'>{props.error}</div>
      )}
    </div>
  )
}

DateInput.propTypes = {
  showDate: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  //value: PropTypes.Date,
  error: PropTypes.string,
  placeholder: PropTypes.string
}

DateInput.defaultProps = {
  error: ''
}

export default DateInput
