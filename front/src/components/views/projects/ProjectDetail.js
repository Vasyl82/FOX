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
import { ProjectPTW } from "../ptw";
import { FoxApiService } from "../../../services";

const foxApi = new FoxApiService();

class ProjectDetail extends Component {
  state = {
    status: ''
  }

  componentDidMount = async () => {
    const projectId = this.props.match.params.id
    this.props.setProjectId(projectId);
    await this.props
      .getProfileFetch()
      .then(() =>foxApi.getDetailsOf('projects', projectId))
      .then(data => this.setState({status: data.status}))
      .catch((error) => console.log(error))
      .finally(() => this.props.changeLoadingState());
  };

  componentWillUnmount = async () => {
    this.props.setProjectId("");
  };

  render = () => {
    const { loading, changeLoadingState, ...props } = this.props;
    return (
      <React.Fragment>
        <CCard>
          <CCardHeader className="d-flex justify-content-between">
            <CCardTitle>Project details</CCardTitle>
            {["Created", "Rejected", "Submitted"].includes(this.state.status) &&  this.props.role === "CliAdm" ? (
              <CLink to={`${this.props.location.pathname}/edit`}>
                Edit project
              </CLink>
            ) : null}
          </CCardHeader>
          <CCardBody>
            <WithLoadingSpinner loading={loading}>
              <ProjectPTW {...props} forceFilledPTW/>
            </WithLoadingSpinner>
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
