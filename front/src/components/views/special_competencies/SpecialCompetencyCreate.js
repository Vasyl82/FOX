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
} from "@coreui/react";
import DjangoCSRFToken from 'django-react-csrftoken';
import { FoxApiService } from '../../../services';
import { getProfileFetch, } from '../../../actions';
import { WithLoading, WithLoadingSpinner } from '../../loadings'


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

    this.requestData = this.state;
    delete this.requestData.error;
    this.formData = new FormData
    Object.entries(this.requestData).forEach(([key, value]) => {
      this.formData.append(key, value);
    })
    await foxApi.createEntityWithFile('worker_special_competencies', this.formData)
      .then(() => {
        this.state.submitCallback()
      },
        (error) => {
          console.error(error);
          this.setState({
            error: 'Document creation failed!' +
              ' Please check your input and try again!' +
              ' In case this problem repeats, please contact your administrator!'
          })
        })
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
      .then(() => this.props.changeLoadingState())
  }

  render = () => {
    return (
      <CRow>
        <CCol>
          <WithLoadingSpinner loading={this.props.loading}>
            <CForm
              onSubmit={this.handleSubmit}
            >
              <DjangoCSRFToken />
              <CFormGroup>
                <CLabel htmlFor="name">Name</CLabel>
                <CInput
                  id="name"
                  name='name'
                  placeholder="Enter document name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  required />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="file">File</CLabel>
                <CInputFile id="file" name="file" onChange={this.handleFileUpload} key={this.state.file}
                  required />
              </CFormGroup>
              <CFormGroup>
                <CLabel htmlFor="issued_by">Issued by</CLabel>
                <CInput
                  id="issued_by"
                  name='issued_by'
                  placeholder="Enter authority name"
                  value={this.state.issued_by}
                  onChange={this.handleChange}
                  required />
              </CFormGroup>
              <CFormGroup>
                <CRow>
                  <CCol md="6">
                    <CButton onClick={this.handleSimpleSubmit} type="submit" color="dark" variant="outline" block>Create Competency</CButton>
                  </CCol>
                  <CCol md="6">
                    <CButton onClick={this.handleSubmitOneMore} type="submit" color="primary" variant="outline" block>Create and add one more Competency</CButton>
                  </CCol>
                </CRow>
              </CFormGroup>
              {this.state.error
                ? <p>{this.state.error}</p>
                : null
              }
            </CForm>
          </WithLoadingSpinner>
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
