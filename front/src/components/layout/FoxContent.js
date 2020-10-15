import React, { Suspense } from 'react'
import { connect } from 'react-redux'
import {
  Redirect,
  Route,
  Switch
} from 'react-router-dom'
import { CContainer, CFade } from '@coreui/react'
import routes from '../routes'
import { LoadingSpinner } from '../loadings'

const Page404 = React.lazy(() => import('../pages/Page404'));

const FoxContent = (props) => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={<LoadingSpinner />}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => (
                    <CFade>
                      <route.component {...props} />
                    </CFade>
                  )} />
              )
            })}
            {
              <Redirect from="/" to="/projects" />
            }
            <>
              <Page404 />
            </>
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  )
}

const mapStateToProps = state => ({
  role: state.currentUser.role
})

export default connect(mapStateToProps, null)(React.memo(FoxContent))
