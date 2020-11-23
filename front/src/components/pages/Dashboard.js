import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getProfileFetch, getDashboardLayout } from "../../actions";
import {} from "@coreui/react";
import { FoxSidebar, FoxHeader, FoxContent } from "../layout";
import { matchPath } from "react-router-dom";
import { WithLoading, WithLoadingSpinner } from "../loadings";

class Dashboard extends Component {
  componentDidMount = async () => {
    const updatedMatch = matchPath(this.props.location.pathname, {
      path: "/projects/:id/",
      exact: false,
    });
    const projectId = updatedMatch
      ? updatedMatch.params.id
      : this.props.match.params.id;
    await this.props
      .getProfileFetch()
      .then(
        async () =>
          await this.props.getDashboardLayout(
            this.props.currentUser.role,
            projectId
          )
      )
      .catch((error) => {
        console.log(error);
      })
      .finally(this.props.changeLoadingState);
  };

  componentDidUpdate = (prevProps) => {
    const updatedMatch = matchPath(this.props.location.pathname, {
      path: "/projects/:id/",
      exact: false,
    });
    if (
      updatedMatch &&
      prevProps.location.pathname != this.props.location.pathname
    ) {
      this.props.getDashboardLayout(
        this.props.currentUser.role,
        updatedMatch.params.id
      );
    }
  };

  render() {
    const { loading, ...props } = this.props;
    return (
      <React.Fragment>
        <WithLoadingSpinner loading={loading}>
          {props.currentUser.username ? (
            <div className="c-app c-default-layout">
              <FoxSidebar />
              <div className="c-wrapper">
                <FoxHeader />
                <div className="c-body">
                  <FoxContent />
                </div>
              </div>
            </div>
          ) : (
            <Redirect to="/login" />
          )}
        </WithLoadingSpinner>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    navigation: state.sidebar,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProfileFetch: async () => await dispatch(getProfileFetch()),
  getDashboardLayout: async (userRole, projectId) =>
    await dispatch(getDashboardLayout(userRole, projectId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoading(Dashboard));
