import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
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
  CCardTitle,
  CCardHeader,
  CCardBody,
  CCardFooter, CCardSubtitle,
  CFormText
} from "@coreui/react";
import DjangoCSRFToken from 'django-react-csrftoken';
import { FoxApiService } from '../../../services';
import { getProfileFetch, } from '../../../actions';
import { SubmitSpinner, WithLoading, WithLoadingSpinner } from '../../loadings';


const foxApi = new FoxApiService();

const uploadOptions = [
  { id: 1, name: "URL" },
  { id: 2, name: "File upload" }
]

class DocumentCreate extends Component {

  state = {
    name: "",
    file: "",
    project: this.props.match.params.id,
    url_to_doc: "",
    upload_option: -1,
    error: false
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  handleFileUpload = event => {
    this.setState({
      [event.target.name]: event.target.files[0]
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.props.changeSubmitState()
    if (this.state.upload_option === -1) {
      this.setState({
        error: "Please, choose the file attachment option and attach the file itself before submitting the document"
      })
    }
    else {
      this.requestData = this.state;
      delete this.requestData.error;
      delete this.requestData.upload_option;
      this.formData = new FormData
      Object.entries(this.requestData).forEach(([key, value]) => {
        this.formData.append(key, value);
      })
      await foxApi.createEntityWithFile('documents', this.formData)
        .then(() => {
          this.props.history.push(`/projects/${this.props.match.params.id}/documents`)
        })
        .catch((error) => {
          console.error(error);
          this.setState({
            error: 'Document creation failed!' +
              ' Please check your input and try again!' +
              ' In case this problem repeats, please contact your administrator!'
          })
        })
        .finally(() => this.props.changeSubmitState())
    }
  }

  componentDidMount = async () => {
    await this.props.getProfileFetch()
      .catch(error => console.log(error))
      .finally(() => this.props.changeLoadingState())
  }


  render = () => {
    const { upload_option, error, name, url_to_doc, } = this.state
    return (
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CCardTitle>
                New Document
              </CCardTitle>
              <CCardSubtitle>
                Fill this form to create a custom document for the project
              </CCardSubtitle>
            </CCardHeader>
            <CCardBody>
              <WithLoadingSpinner loading={this.props.loading}>
                <CForm
                  onSubmit={this.handleSubmit}
                >
                  <DjangoCSRFToken />
                  <CFormGroup>
                    <CInput
                      id="name"
                      name='name'
                      placeholder="Document name"
                      value={name}
                      onChange={this.handleChange}
                      disabled={this.props.submitting}
                      readOnly={this.props.submitting}
                      required />
                  </CFormGroup>
                  <CFormGroup>
                    <CSelect
                      id="upload_option"
                      name="upload_option"
                      value={upload_option}
                      onChange={this.handleChange}
                      disabled={this.props.submitting}
                      readOnly={this.props.submitting}
                      required
                    >
                      <option value={-1} >Choose File upload option</option>
                      {uploadOptions.map((option) => {
                        return (
                          <option key={option.id} value={option.id}>{option.name}</option>
                        )
                      })
                      }
                    </CSelect>
                  </CFormGroup>

                  {upload_option == 1 ?
                    <CFormGroup >
                      <CInput
                        type="url"
                        id="url_to_doc"
                        name="url_to_doc"
                        placeholder="URL to document"
                        pattern="https://.*"
                        value={url_to_doc}
                        onChange={this.handleChange}
                        disabled={this.props.submitting}
                        readOnly={this.props.submitting}
                        required />
                    </CFormGroup>
                    : null
                  }
                  {upload_option == 2 ?
                    <CFormGroup>
                      <CLabel htmlFor="file">File</CLabel>
                      <CInputFile id="file"
                        name="file"
                        onChange={this.handleFileUpload}
                        disabled={this.props.submitting}
                        readOnly={this.props.submitting}
                        required />
                      <CFormText>Required formats: .doc, .docx, .xls, .xlsx, .pdf</CFormText>
                    </CFormGroup>
                    : null}
                  {error
                    ? <p className={"fox-form-invalid-feedback"}>{error}</p>
                    : null
                  }
                </CForm>
              </WithLoadingSpinner>
            </CCardBody>
            <CCardFooter>
              <CButton
                disabled={this.props.submitting || this.props.loading}
                shape="pill"
                color="dark"
                variant="outline"
                onClick={this.handleSubmit}
                block>
                <SubmitSpinner submitting={this.props.submitting} />
                Create Document
              </CButton>
            </CCardFooter>
          </CCard>
        </CCol>
      </CRow >
    )
  }
}

const mapStateToProps = state => {
  return {
    company: state.currentUser.company,
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WithLoading(DocumentCreate)))
