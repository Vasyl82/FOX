import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getProfileFetch,
  getWorkerList,
  clearList,
  setProjectId,
} from "../../../actions";
import { WithLoading, WithLoadingSpinner } from "../../loadings";
import { FoxApiService } from "../../../services";
import PTWToBeSubmitted from "./PTWToBeSubmitted";
import FilledPTW from "./FilledPTW";

const foxApi = new FoxApiService();

class ProjectPTW extends Component {
  state = {};

  componentDidMount = async () => {
    const projectId = this.props.match.params.id;
    this.props.setProjectId(projectId);
    await this.props
      .getProfileFetch()
      .then(() => foxApi.getDetailsOf("projects", projectId))
      .then(async (projectInfo) => {
        await this.props.getWorkerList({
          params: {contractor_id: projectInfo.contractor},
          signal: this.abortController.signal,
        })
        this.setState({
          ...projectInfo,
        });
      })
      .catch((error) => console.log(error))
      .finally(() => this.props.changeLoadingState());
  };

  componentWillUnmount = async () => {
    this.abortController.abort();
    await this.props.clearList();
  };

  abortController = new window.AbortController();

  render = () => {
    const { ...state } = { ...this.state };
    return (
      <WithLoadingSpinner loading={this.props.loading}>
        {["Created", "Rejected"].includes(this.state.status) &&
        this.props.role === "Contr" && !this.props.forceFilledPTW ? (
          <PTWToBeSubmitted projectInfo={state} {...this.props} />
        ) : (
          <FilledPTW projectInfo={state} {...this.props} />
        )}
      </WithLoadingSpinner>
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
  getProfileFetch: async () => await dispatch(getProfileFetch()),
  getWorkerList: async ({ ...kwargs }) =>
    await dispatch(getWorkerList({ ...kwargs })),
  clearList: () => dispatch(clearList()),
  setProjectId: (id) => dispatch(setProjectId(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoading(ProjectPTW));
