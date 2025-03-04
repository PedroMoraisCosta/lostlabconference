import React from 'react'

import { renderRoutes } from 'react-router-config'
import CodeCampMenu from './CodeCampMenu'
import PageTop from './PageTop'
import Footer from './Footer'
import { connect } from 'react-redux'

const App = props => {
  return (
    <div>
      <PageTop>
        {/* <CodeCampMenu birthdayTotal={props.birthdayTotal} /> */}
      </PageTop>
      {renderRoutes(props.route.routes)}
      {/* <Footer /> */}
    </div>
  )
}

// export default {
//   component: App
// }

const mapStateToProps = state => {
  return {
    birthdayTotal: state.customers.birthdayTotal
  }
}

export default {
  component: connect(mapStateToProps, {})(App)
}
