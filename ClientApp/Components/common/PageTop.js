import React from 'react'
import PropTypes from 'prop-types'

export default function PageTop (props) {
  return (
    <div>
      <header className='header'>
        <div className='container-main d-flex align-items-left justify-content-around'>
          {props.children}
          {/* <a href='/' rel='home' className='header-logo'> */}
          {/* <div className='header-logo'>
            <img src='assets/images/SVCClogo.png' alt='SVCC' />
          </div> */}
          {/* </a> */}
        </div>
      </header>
    </div>
  )
}

PageTop.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}
