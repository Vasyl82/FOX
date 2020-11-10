import React, { Component } from "react";
import { getProfileFetch } from "../../../actions";
import { connect } from "react-redux";
import {
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CCol,
  CSelect,
  CButton,
  CInputFile,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
} from "@coreui/react";
import DjangoCSRFToken from "django-react-csrftoken";
import { FoxApiService } from "../../../services";
import { SubmitSpinner, WithLoading, WithLoadingSpinner } from "../../loadings";

const foxApi = new FoxApiService();

const uploadOptions = [
  { id: 1, name: "URL" },
  { id: 2, name: "File upload" },
];

class DocumentDetail extends Component {
  state = {
    name: "",
    file: "",
    project: this.props.match.params.id,
    url_to_doc: "",
    error: false,
    upload_option: 2,
    template: "",
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleFileUpload = (event) => {
    this.setState({
      [event.target.name]: event.target.files[0],
    });
  };

  downloadFile = async () => {
    await foxApi
      .downloadDocument(this.props.match.params.doc_id)
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        const filename = this.state.file.split("/").pop();
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error("File download failed!");
        console.error(error);
      });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.changeSubmitState();
    const requestData = this.state;
    if (requestData.upload_option === "1") {
      requestData.file = "";
    } else {
      requestData.url_to_doc = "";
    }
    delete requestData.error;
    delete requestData.upload_option;
    typeof requestData.file === "string" ? delete requestData.file : null;
    requestData.template ? null : delete requestData.template;
    const formData = new FormData();
    Object.entries(requestData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    await foxApi
      .patchEntityWithFiles(
        "documents",
        this.props.match.params.doc_id,
        formData
      )
      .then(() => {
        this.props.history.goBack();
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          error:
            "Document update failed!" +
            " Please check your input and try again!" +
            " In case this problem repeats, please contact your administrator!",
        });
      })
      .finally(() => this.props.changeSubmitState());
  };

  componentDidMount = async () => {
    await this.props
      .getProfileFetch()
      .then(() =>
        foxApi.getDetailsOf("documents", this.props.match.params.doc_id)
      )
      .then((data) => {
        data.url_to_doc
          ? this.setState({
              upload_option: 1,
              ...data,
            })
          : this.setState({ ...data });
      })
      .catch((error) => console.log(error))
      .finally(() => this.props.changeLoadingState());
  };

  render = () => {
    const { name, upload_option, url_to_doc, file, error } = this.state;
    return (
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CCardTitle>Document {name} details</CCardTitle>
            </CCardHeader>
            <CCardBody>
              <WithLoadingSpinner loading={this.props.loading}>
                <CForm onSubmit={this.handleSubmit}>
                  <DjangoCSRFToken />
                  <CFormGroup>
                    <CLabel htmlFor="name">Name</CLabel>
                    <CInput
                      id="name"
                      name="name"
                      placeholder="Enter document name"
                      value={name}
                      onChange={this.handleChange}
                      disabled={this.props.submitting}
                      readOnly={this.props.submitting}
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="upload_option">File upload option</CLabel>
                    <CSelect
                      id="upload_option"
                      name="upload_option"
                      placeholder="Choose contractor"
                      value={upload_option}
                      onChange={this.handleChange}
                      readOnly={this.props.submitting}
                      required
                    >
                      {uploadOptions.map((option) => {
                        return (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        );
                      })}
                    </CSelect>
                  </CFormGroup>
                  {upload_option == 1 ? (
                    <CFormGroup>
                      <CLabel htmlFor="url_to_doc">Url to document</CLabel>
                      <CInput
                        type="url"
                        id="url_to_doc"
                        name="url_to_doc"
                        placeholder="https://example.com"
                        pattern="https://.*"
                        value={url_to_doc}
                        onChange={this.handleChange}
                        disabled={this.props.submitting}
                        readOnly={this.props.submitting}
                        required
                      />
                    </CFormGroup>
                  ) : (
                    <React.Fragment>
                      <CFormGroup>
                        <CButton
                          shape="pill"
                          variant="outline"
                          color="success"
                          onClick={this.downloadFile}
                          disabled={this.props.submitting}
                        >
                          <SubmitSpinner submitting={this.props.submitting} />
                          Link to download current file
                        </CButton>
                      </CFormGroup>
                      <CFormGroup>
                        <CLabel htmlFor="file">Upload new File</CLabel>
                        <CInputFile
                          id="file"
                          name="file"
                          onChange={this.handleFileUpload}
                          disabled={this.props.submitting}
                          readOnly={this.props.submitting}
                        />
                      </CFormGroup>
                    </React.Fragment>
                  )}
                  <CFormGroup>
                    <CButton
                      shape="pill"
                      type="submit"
                      color="dark"
                      variant="outline"
                      disabled={this.props.submitting}
                      block
                    >
                      <SubmitSpinner submitting={this.props.submitting} />
                      Update Document
                    </CButton>
                  </CFormGroup>
                  {error ? <p>{error}</p> : null}
                </CForm>
              </WithLoadingSpinner>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    );
  };
}

const mapDispatchToProps = (dispatch) => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
});

export default connect(null, mapDispatchToProps)(WithLoading(DocumentDetail));
