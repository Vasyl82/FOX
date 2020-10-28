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
  CButton,
  CInputFile,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCardSubtitle
} from "@coreui/react";
import DjangoCSRFToken from 'django-react-csrftoken';
import { FoxApiService } from '../../../services';
import { getProfileFetch, } from '../../../actions';
import { SubmitSpinner, WithLoading, WithLoadingSpinner } from '../../loadings'


const foxApi = new FoxApiService();


class SpecialCompetencyCreate extends Component {

  state = {
    worker: this.props.match.params.id,
    name: "",
    file: "",
    issued_by: "",
    submitCallback: "",
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
    this.requestData = this.state;
    delete this.requestData.error;
    this.formData = new FormData
    Object.entries(this.requestData).forEach(([key, value]) => {
      this.formData.append(key, value);
    })
    await foxApi.createEntityWithFile('worker_special_competencies', this.formData)
      .then(() => {
        this.state.submitCallback()
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

  handleSimpleSubmit = () => {
    this.setState({
      submitCallback: () => this.props.history.push(`/workers/${this.props.match.params.id}/competencies`)
    });
  }

  handleSubmitOneMore = () => {
    this.setState({
      submitCallback: () => this.setState({
        name: "",
        file: "",
        issued_by: "",
        submitCallback: "",
      })
    })
  }

  componentDidMount = async () => {
    await this.props.getProfileFetch()
      .catch(error => console.log(error))
      .finally(() => this.props.changeLoadingState())
  }

  render = () => {
    return (
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CCardTitle>
                New Special competency
              </CCardTitle>
              <CCardSubtitle>Please, fill in this form to create new special competency for worker.</CCardSubtitle>
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
                      placeholder="Competency name"
                      value={this.state.name}
                      onChange={this.handleChange}
                      disabled={this.props.submitting}
                      readOnly={this.props.submitting}
                      required />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel htmlFor="file">File</CLabel>
                    <CInputFile
                      id="file"
                      name="file"
                      onChange={this.handleFileUpload}
                      key={this.state.file}
                      disabled={this.props.submitting}
                      readOnly={this.props.submitting}
                      required />
                  </CFormGroup>
                  <CFormGroup>
                    <CInput
                      id="issued_by"
                      name='issued_by'
                      placeholder="Competency issued by"
                      value={this.state.issued_by}
                      onChange={this.handleChange}
                      disabled={this.props.submitting}
                      readOnly={this.props.submitting}
                      required />
                  </CFormGroup>
                  <CFormGroup>
                    <CRow>
                      <CCol md="6">
                        <CButton
                          shape="pill"
                          onClick={this.handleSimpleSubmit}
                          type="submit"
                          color="dark"
                          variant="outline"
                          disabled={this.props.submitting}
                          block>
                          <SubmitSpinner submitting={this.state.submitting} />
                      Create Competency
                    </CButton>
                      </CCol>
                      <CCol md="6">
                        <CButton
                          shape="pill"
                          onClick={this.handleSubmitOneMore}
                          type="submit"
                          color="primary"
                          variant="outline"
                          disabled={this.props.submitting}
                          block>
                          <SubmitSpinner submitting={this.state.submitting} />
                      Create and add one more Competency
                    </CButton>
                      </CCol>
                    </CRow>
                  </CFormGroup>
                  {this.state.error
                    ? <p>{this.state.error}</p>
                    : null
                  }
                </CForm>
              </WithLoadingSpinner>
            </CCardBody>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(WithLoading(SpecialCompetencyCreate)))
