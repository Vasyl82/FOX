import React, { Component } from "react";
import {
  getProfileFetch,
  getDocuments,
  setProjectId,
  clearList,
  updateDocument,
  deleteDocumentsFromStore,
} from "../../../actions";
import { connect } from "react-redux";
import { FoxApiService } from "../../../services";
import FoxRelatedDocsTable from "../../tables/FoxRelatedDocsTable";
import { WithLoading } from "../../loadings";
import { handleError } from "../../errors";

const foxApi = new FoxApiService();

class ProjectUploadDocs extends Component {
  state = {
    error: false,
  };

  handleFilledFileUpload = async (event) => {
    console.log(event.target.files);
    const docFilledFile = event.target.files[0];
    const docId = event.target.name;
    const formData = new FormData();
    formData.append("filled_file", docFilledFile);
    formData.entries().forEach((entry) => console.log(entry));
    await foxApi
      .patchEntityWithFiles("documents", docId, formData)
      .then((updatedDocument) => {
        this.props.updateDocument(updatedDocument);
      })
      .catch((error) => {
        const errors = handleError({
          error: error,
          operation: "Uploaded Document",
          validationFields: ["filled_file"],
        });

        this.setState({
          error: errors,
        });
      });
  };

  componentDidMount = async () => {
    const params = {
      target_type: "Contractor",
      project_id: this.props.match.params.id,
    };
    this.props.setProjectId(this.props.match.params.id);
    await this.props
      .getProfileFetch()
      .then(() =>
        this.props.getDocuments({
          params,
          signal: this.abortController.signal,
        })
      )
      .catch((error) => console.log(error))
      .finally(() => this.props.changeLoadingState());
  };

  componentWillUnmount = async () => {
    this.abortController.abort();
    await this.props.clearList();
    this.props.deleteDocumentsFromStore();
  };

  abortController = new window.AbortController();

  render = () => {
    return (
      <>
        <FoxRelatedDocsTable
          {...this.props}
          tableName="Related Documents"
          tableData={this.props.documents}
          loading={this.props.loading}
          handleFileUpload={this.handleFilledFileUpload}
          readOnly={this.props.submitting}
          disabled={this.props.submitting}
        />
      </>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    documents: state.projectDocs,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProfileFetch: async () => await dispatch(getProfileFetch()),
  getDocuments: async ({ ...params }) =>
    await dispatch(getDocuments({ ...params })),
  setProjectId: (id) => dispatch(setProjectId(id)),
  clearList: () => dispatch(clearList()),
  updateDocument: (document) => dispatch(updateDocument(document)),
  deleteDocumentsFromStore: () => dispatch(deleteDocumentsFromStore()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoading(ProjectUploadDocs));
