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
      .then(
        async () =>
          await this.props.getWorkerList({
            signal: this.abortController.signal,
          })
      )
      .then(() => foxApi.getDetailsOf("projects", projectId))
      .then(async (projectInfo) => {
        const signature = await foxApi.getSignature(projectInfo.contractor);
        projectInfo.signature = signature;
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
    console.log(state);
    return (
      <WithLoadingSpinner loading={this.props.loading}>
        {["Created", "Rejected"].includes(this.state.status) ? (
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
