import { Multiselect } from 'multiselect-react-dropdown'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export const MultiSelectDrop = props => {
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
        <Multiselect
          style={{
            optionContainer: {
              // To change css for option container
              border: '2px solid',
              fontFamily: 'sans-serif'
            },
            searchBox: {
              // To change search box element look
              fontFamily: 'sans-serif'
            },
            multiselectContainer: {
              // width: '95%',
              // marginLeft: '.5rem',
              lineHeight: '1.25'
            },
            searchBox: {
              // To change search box element look
              fontFamily: 'sans-serif'
            },
            chips: {
              // To change css chips(Selected options)
              fontSize: '1rem'
            }
          }}
          hidePlaceholder={true}
          closeIcon={'cancel'}
          placeholder={props.placeholder}
          emptyRecordMsg={'Sem dados'}
          options={props.options} // Options to display in the dropdown
          selectedValues={props.selectedValue} // Preselected value to persist in dropdown
          onSelect={props.onSelect} // Function will trigger on select event
          onRemove={props.onRemove} // Function will trigger on remove event
          singleSelect={props.singleSelect}
          displayValue={props.displayValue} // Property name to display in the dropdown options
        />
      </div>
      {props.error && (
        <div className='alert alert-danger text'>{props.error}</div>
      )}
    </div>
  )
}

MultiSelectDrop.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  selectedValues: PropTypes.array,
  singleSelect: PropTypes.bool.isRequired,
  displayValue: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
}

export default MultiSelectDrop
