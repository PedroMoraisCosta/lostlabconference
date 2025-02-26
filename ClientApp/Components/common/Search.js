import React from 'react'

function Search (props) {
  return (
    <div className='filter-bar__search input-group col-12'>
      <input
        type='text'
        className='form-control js-events-text-search'
        placeholder={props.placeHolder}
        onChange={props.onChange}
      />
      <div className='input-group-addon filter-bar__search__button'>
        <i className='fa fa-search' aria-hidden='true' />
      </div>
    </div>
  )
}

export default Search
