import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfileFetch, setProjectId } from "../../../actions";
import {
  CRow,
  CCol,
  CEmbed,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CLink,
} from "@coreui/react";
import { ActivityLog } from "../../activity_log";
import { WithLoading, WithLoadingSpinner } from "../../loadings";

class ProjectDetail extends Component {
  componentDidMount = async () => {
    this.props.setProjectId(this.props.match.params.id);
    await this.props
      .getProfileFetch()
      .catch((error) => console.log(error))
      .finally(() => this.props.changeLoadingState());
  };

  componentWillUnmount = async () => {
    this.props.setProjectId("");
  };

  render = () => {
    return (
      <React.Fragment>
        <CCard>
          <CCardHeader className="d-flex justify-content-between">
            <CCardTitle>Project details</CCardTitle>
            {this.props.role === "CliAdm" ? (
              <CLink to={`${this.props.location.pathname}/edit`}>
                Edit project
              </CLink>
            ) : null}
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol>
                <ActivityLog projectId={this.props.match.params.id} />
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <WithLoadingSpinner loading={this.props.loading}>
                  <CEmbed ratio="16by9">
                    <iframe
                      src={`${window.location.origin}/api/ptw/${this.props.match.params.id}`}
                    />
                  </CEmbed>
                </WithLoadingSpinner>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </React.Fragment>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    username: state.currentUser.username,
    role: state.currentUser.role,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  setProjectId: (id) => dispatch(setProjectId(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoading(ProjectDetail));
