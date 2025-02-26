import React from 'react'

export default function Loading (props) {
    return (
      <div className='alert alert-info alert-dismissible fade show'>
      <h1>{props.title}...</h1>
    </div>
    )
  }