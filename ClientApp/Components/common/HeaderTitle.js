import React from 'react'

export default function HeaderTitle (props) {
  return (
    <div className='jumbo-common  speakers snow-bg'>
      <div className='container-main'>
        <div className='events__header d-flex align-items-center flex-column flex-md-row justify-content-between'>
  <h1 className='jumbo-common__title'>{props.title}</h1>
        </div>
      </div>
    </div>
  )
}
