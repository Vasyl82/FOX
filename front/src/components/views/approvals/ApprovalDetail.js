import React, { Component } from "react";
import { connect } from "react-redux";
import DjangoCSRFToken from "django-react-csrftoken";
import {
  getProfileFetch,
  getDocuments,
  getWorkerList,
  clearList,
  deleteDocumentsFromStore,
} from "../../../actions";
import {
  CForm,
  CFormGroup,
  CLabel,
  CRow,
  CCol,
  CTextarea,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCollapse,
  CCardTitle,
  CListGroup,
  CListGroupItem,
} from "@coreui/react";
import { FoxApiService } from "../../../services";
import { WorkerReview } from "../../../utils";
import { SubmitSpinner, WithLoading, WithLoadingSpinner } from "../../loadings";

const foxApi = new FoxApiService();

class ApprovalDetail extends Component {
  state = {
    description: "",
    created: "",
    last_resolved: "",
    status: "",
    project: "",
    manager: "",
    error: "",
    filename: "",
    file_id: "",
    current_worker_id: "",
    current_worker_info: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleWorkerSelect = (event) => {
    this.state.current_worker_id === event.target.name
      ? this.setState({
          current_worker_id: "",
        })
      : this.setState({
          current_worker_id: event.target.name,
        });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.changeSubmitState();
    if (this.state.status === "Rejected" && !this.state.description) {
      this.setState({
        error:
          "Rejections reason was not provided! Please, specify the rejection reason!",
      });
      this.props.changeSubmitState();
    } else {
      this.formData = this.state;
      delete this.formData.error;
      delete this.formData.created;
      delete this.formData.last_resolved;
      delete this.formData.current_worker_id;
      delete this.formData.current_worker_info;
      await foxApi
        .patchEntityOf("approvals", this.props.match.params.id, this.formData)
        .then(() => {
          this.props.history.goBack();
        })
        .catch((error) => {
          console.error(error);
          this.setState({
            error:
              "Approval resolution failed!" +
              " Please check your input and try again!" +
              " In case this problem repeats, please contact your administrator!",
          });
        })
        .finally(() => this.props.changeSubmitState());
    }
  };

  downloadFile = async (e) => {
    this.setState(
      {
        filename: e.target.value,
        file_id: e.target.name,
      },
      () => {
        foxApi
          .downloadFilledDocument(this.state.file_id)
          .then((blob) => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement("a");
            link.href = url;
            const filename = this.state.filename.split("/").pop();
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
          })
          .catch((error) => {
            console.error("File download failed!");
            console.error(error);
          });
      }
    );
  };

  componentDidMount = async () => {
    await this.props
      .getProfileFetch()
      .then(() => foxApi.getDetailsOf("approvals", this.props.match.params.id))

      .then((data) =>
        this.setState({ ...data }, async () => {
          await Promise.all([
            this.props.getDocuments({
              params: { project_id: this.state.project },
              additional: true,
              signal: this.abortController.signal,
            }),
            this.props.getWorkerList({
              params: { project_id: this.state.project },
              additional: false,
              signal: this.abortController.signal,
            }),
          ]);
        })
      )
      .catch((error) => {
        console.log(error);
      })
      .finally(() => this.props.changeLoadingState());
  };

  componentWillUnmount = async () => {
    this.abortController.abort();
    await this.props.clearList();
    this.props.deleteDocumentsFromStore(this.props.documents);
  };

  abortController = new window.AbortController();

  render = () => {
    return (
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CCardTitle>Attached Documents</CCardTitle>
            </CCardHeader>
            <CCardBody>
              <WithLoadingSpinner loading={this.props.loading}>
                <CListGroup flush>
                  {this.props.documents ? (
                    this.props.documents.map((document, idx) => {
                      return (
                        <React.Fragment key={idx}>
                          <CListGroupItem>
                            <h6>{document.name}</h6>
                            {document.filled_file !== null ? (
                              <CButton
                                variant="outline"
                                color="primary"
                                key={`cb-${document.id}`}
                                id={document.id}
                                name={document.id}
                                value={document.filled_file.split("/").pop()}
                                onClick={this.downloadFile}
                              >
                                Download document
                              </CButton>
                            ) : (
                              "The contractor has not attached the filled version of this document."
                            )}
                          </CListGroupItem>
                        </React.Fragment>
                      );
                    })
                  ) : (
                    <p>There was no documents attached to this project.</p>
                  )}
                </CListGroup>
              </WithLoadingSpinner>
            </CCardBody>
          </CCard>

          <CCard>
            <CCardHeader>
              <CCardTitle>Workers</CCardTitle>
            </CCardHeader>
            <CCardBody>
              <WithLoadingSpinner loading={this.props.loading}>
                {this.props.workers ? (
                  this.props.workers.map((worker, idx) => {
                    return (
                      <CCard key={`card-${idx}`} className="mb-0">
                        <CCardBody key={`cbody-${idx}`}>
                          <h5 key={`h5-${idx}`} className="m-0 p-0">
                            {worker.name}
                          </h5>
                          <h6 key={`h6-${idx}`} className="m-0 p-0">
                            {worker.position_in_company}
                          </h6>
                          <CButton
                            key={`btn-${idx}`}
                            block
                            color="link"
                            className="text-left m-0 p-0"
                            id={worker.id}
                            value={worker.id}
                            name={worker.id}
                            onClick={this.handleWorkerSelect}
                          >
                            Display Details
                          </CButton>
                          <CCollapse
                            key={`clps-${idx}`}
                            show={
                              this.state.current_worker_id ===
                              worker.id.toString()
                            }
                          >
                            <WorkerReview workerId={worker.id} />
                          </CCollapse>
                        </CCardBody>
                      </CCard>
                    );
                  })
                ) : (
                  <p>There was no workers assigned to this project.</p>
                )}
              </WithLoadingSpinner>
            </CCardBody>
          </CCard>
          <CCard>
            <CCardBody>
              <CForm onSubmit={this.handleSubmit}>
                <DjangoCSRFToken />
                <CFormGroup>
                  <CLabel htmlFor="description">Comments:</CLabel>
                  <CTextarea
                    id="description"
                    name="description"
                    value={this.state.description ? this.state.description : ""}
                    onChange={this.handleChange}
                    readOnly={this.props.submitting}
                  ></CTextarea>
                </CFormGroup>
                <CFormGroup>
                  <CButton
                    className="mr-3"
                    shape="pill"
                    type="submit"
                    name="status"
                    value="Approved"
                    color="success"
                    variant="outline"
                    onClick={this.handleChange}
                    disabled={this.props.submitting}
                  >
                    <SubmitSpinner submitting={this.props.submitting} />
                    Approve
                  </CButton>
                  <CButton
                    shape="pill"
                    type="submit"
                    name="status"
                    value="Rejected"
                    color="danger"
                    variant="outline"
                    onClick={this.handleChange}
                    disabled={this.props.submitting}
                  >
                    <SubmitSpinner submitting={this.props.submitting} />
                    Reject
                  </CButton>
                </CFormGroup>
                {this.state.error ? <p>{this.state.error}</p> : null}
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    documents: state.projectDocs,
    workers: state.entityListTable.tableData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  getWorkerList: ({ ...kwargs }) => dispatch(getWorkerList({ ...kwargs })),
  clearList: () => dispatch(clearList()),
  getDocuments: async ({ ...kwargs }) => dispatch(getDocuments({ ...kwargs })),
  deleteDocumentsFromStore: (docs) => dispatch(deleteDocumentsFromStore(docs)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoading(ApprovalDetail));
