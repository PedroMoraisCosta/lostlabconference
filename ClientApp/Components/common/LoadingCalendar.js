import React from 'react'

export default function LoadingCalendar (props) {
  const STYLE = {
    visibility: {
      visibility: props.isLoading ? 'visible' : 'hidden'
    }
  }

  //   return (
  //     <div style={STYLE.visibility}>
  //       <div class='loader'></div>
  //     </div>
  //   )

  return (
    <div className='loading' style={STYLE.visibility}>
      {/* </div> <div className='loading'> */}
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )

  //   return (
  //     <div class='container2'>
  //       {/* <div class='dash uno'></div> */}
  //       <div class='dash dos'></div>
  //       {/* <div class='dash tres'></div>
  //       <div class='dash cuatro'></div> */}
  //     </div>
  //   )
}
