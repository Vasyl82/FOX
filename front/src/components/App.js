import React, { Component, Suspense } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import queryString from 'query-string'
import { getProfileFetch } from '../actions';
import "./style.scss";
import { FoxEngagedModals } from './modals'
import { WithLoading, WithLoadingSpinner, LoadingSpinner } from './loadings';

const Login = React.lazy(() => import('./pages/Login'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Register = React.lazy(() => import('./pages/Register'));
const Page404 = React.lazy(() => import('./pages/Page404'));
const PermitVerification = React.lazy(() => import('./pages/PermitVerification'));


class App extends Component {

  componentDidMount = () => {
    this.props.getProfileFetch()
      .catch(error => {
        console.log(error);
      })
      .finally(() => this.props.changeLoadingState())
  }

  render() {
    return (
      <HashRouter>
        <Suspense fallback={<LoadingSpinner />}>
          <WithLoadingSpinner loading={this.props.loading}>
            <Switch>
              <Route exact path="/permits/validate/:part1/:part2/:part3/" name="Home" render={props => <PermitVerification {...props} />} />
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
              <Route path="/" name="Home" render={props => <Dashboard {...props} />} />
              <>
                <Page404 />
              </>
            </Switch>
            <FoxEngagedModals {...this.props} />
          </WithLoadingSpinner>
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

export default connect(mapStateToProps, mapDispatchToProps)(WithLoading(App));
