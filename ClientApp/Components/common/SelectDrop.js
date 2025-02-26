import React from 'react'
import Select from 'react-select'

export const SelectDrop = props => {
  const options = props.options
  if (props.selectedIndex != 1) {
  }

  let wrapperClass = "form-group'"
  if (props.error) {
    wrapperClass += ' has error'
  }

  return (
    <div className={wrapperClass}>
      <label className='multiselectlabel' htmlFor={props.displayValue}>
        {props.label}
      </label>
      <div className='field'>
        <Select
          noOptionsMessage='Sem dados'
          className='basic-single'
          classNamePrefix='select'
          value={options[props.selectedIndex]}
          isDisabled={false}
          isLoading={false}
          isClearable={false}
          isRtl={false}
          isSearchable={true}
          name='name'
          options={options}
          placeholder={props.placeholder}
          getOptionValue={option => `${option['id']}`}
          getOptionLabel={option => `${option['name']}`}
          onChange={props.onSelect}
          noOptionsMessage={() => 'nao existe...'}
        />
      </div>
      {props.error && (
        <div className='alert alert-danger text'>{props.error}</div>
      )}
    </div>
  )
}

export default SelectDrop
