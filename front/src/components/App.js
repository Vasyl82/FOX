import React, { Component, Suspense } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { CSpinner } from '@coreui/react';
import { connect } from 'react-redux';
import queryString from 'query-string'
import { getProfileFetch } from '../actions';
import "./style.scss";
import { FoxEngagedModals } from './modals'


const loading = (
  <div className="pt-3 text-center">
    <CSpinner size="sm" variant="grow" style={{ width: '4rem', height: '4rem' }} />
  </div>
)

const Login = React.lazy(() => import('./pages/Login'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Register = React.lazy(() => import('./pages/Register'));
const Page404 = React.lazy(() => import('./pages/Page404'));

class App extends Component {

  componentDidMount() {
    this.props.getProfileFetch();
  }

  render() {
    return (
      <HashRouter>
        <Suspense fallback={loading}>
          <Switch>
            {/* <Route exact path="/projects" name="Projects" render={props => <ProjectList {...props} />} /> */}
            <Route exact path="/register" name="Register Page" render={
              props => {
                return <Register
                  username={queryString.parse(props.location.search).username}
                  token={queryString.parse(props.location.search).token}
                  {...props}
                />
              }
            } />
            <Route exact path="/login" name="Login Page" render={
              props => {
                let this_props = this.props;
                return this_props.currentUser.username ? <Redirect to="/" /> : <Login {...props} />
              }
            } />
            <Route path="/" name="Home" render={props => <Dashboard {...props} />}>
            </Route>
            <>
              <Page404 />
            </>
          </Switch>
          <FoxEngagedModals {...this.props} />
        </Suspense>
      </HashRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
