import React from 'react'
import HeaderTitle from '../common/HeaderTitle'
import Home from './HomeAniversarios'

export default function AniversariosContainer (props) {
  return (
    <div className='container-main'>
      <div className='row'>
        <div className='col-12'>
          <HeaderTitle title='Aniversarios' />
          <Home aniversarios={props.aniversarios} />
        </div>
      </div>
    </div>
  )
}
