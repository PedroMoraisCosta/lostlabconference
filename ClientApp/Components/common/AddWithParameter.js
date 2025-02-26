import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class AddWithParameter extends Component {
  render () {
    return (
      <div className='customers-title'>
        <div className='filter-bar__more-filters col-12 d-flex align-items-center'>
          <span className='square-icon square-icon--primary '>
            <i className='fa fa-plus' aria-hidden='true' />
          </span>
          <Link
            className='filter-bar__more-filters__label'
            to={{
              pathname: this.props.linkto + this.props.value,
              param1: this.props.value
            }}
          >
            Adicionar {this.props.title}
          </Link>
        </div>
      </div>
    )
  }
}

export default AddWithParameter
