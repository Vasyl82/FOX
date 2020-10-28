import React, { Component } from 'react'
import { getProfileFetch, getContractorList, clearList } from '../../../actions'
import { connect } from 'react-redux'
import {
  CForm,
  CFormGroup,
  CInput,
  CLabel,
  CRow,
  CCol,
  CContainer,
  CTextarea,
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CCardTitle,
  CCardSubtitle,
} from "@coreui/react";
import DjangoCSRFToken from 'django-react-csrftoken'
import { FoxApiService } from '../../../services'
import { FoxSwitchGroup, } from '../../../utils'
import { FoxReactSelectFormGroup, FoxFormGroupWithUpload } from '../../forms'
import { permitOptions } from './optionsLists'
import { WithLoadingSpinner, WithLoading, SubmitSpinner } from '../../loadings'

const foxApi = new FoxApiService();

class ProjectCreate extends Component {

  state = {
    name: "",
    location: "",
    description: "",
    start_date: "",
    end_date: "",
    company: this.props.company,
    contractor: "-1",
    work_at_height: false,
    lifting_work: false,
    confined_space: false,
    hot_work: false,
    chemical_handling: false,
    work_alone: false,
    work_at_sensitive_area: false,
    cold_work: false,
    input_document_name: "",
    file: "",
    error: false,

  }

  handleFileUpload = (event) => {
    this.setState({
      [event.target.name]: event.target.files[0],
    });
  };

  handleChange = event => {

    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleCheck = event => {
    this.setState({
      [event.target.name]: event.target.checked
    })
  }

  handleReactSelect = (option, event) => {
    this.setState({
      [event.name]: option.value
    })
  }

  silenceSubmit = event => {
    event.preventDefault();
  }

  handleCreateProject = async () => {
    await this.handleSubmit()
      .then(() => {
        this.props.history.goBack()
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          error: 'Project creation failed!' +
            ' Please check your input and try again!' +
            ' In case this problem repeats, please contact your administrator!'
        })
      })
  }

  handleDocumentCreationRedirect = async () => {
    this.props.changeSubmitState()
    await this.handleSubmit()
      .then(data => {
        data ?
          this.props.history.push(`/projects/${data.id}/documents/new`)
          : null
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          error: 'Project creation failed!' +
            ' Please check your input and try again!' +
            ' In case this problem repeats, please contact your administrator!'
        })
      })
      .finally(() => this.props.changeSubmitState())
  }

  handleSubmit = async () => {
    if (parseInt(this.state.contractor) < 0) {
      this.setState({
        error: 'Contractor was not selected! Please, choose contractor form the list'
      })

    } else {
      this.formData = this.state;
      delete this.formData.error;
      return await foxApi.createEntityOf('projects', this.formData)
    }
  }

  componentDidMount = async () => {
    await this.props.getProfileFetch()
      .then(() => this.props.getContractorList({ signal: this.abortController.signal }))
      .then(() => this.props.changeLoadingState())
  }

  componentWillUnmount = async () => {
    this.abortController.abort();
    await this.props.clearList();
  }

  abortController = new window.AbortController();

  render = () => {
    const options = this.props.options ? this.props.options.map(option => { return { value: option.id, label: option.username } }) : null

    return (
      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <CCardTitle>
                Add New Project
              </CCardTitle>
              <CCardSubtitle>Fill up the form below to add a new Project</CCardSubtitle>
            </CCardHeader>
            <CCardBody>
              <WithLoadingSpinner loading={this.props.loading}>
                <CForm
                  onSubmit={this.silenceSubmit}
                >
                  <DjangoCSRFToken />
                  <CFormGroup>
                    <CInput
                      id="name"
                      name='name'
                      placeholder="Project Name"
                      value={this.state.name}
                      onChange={this.handleChange}
                      readOnly={this.props.submitting}
                      disabled={this.props.submitting}
                      required />
                  </CFormGroup>
                  <CFormGroup>
                    <CInput
                      id="location "
                      name="location"
                      placeholder="Project Works Location"
                      value={this.state.location}
                      onChange={this.handleChange}
                      readOnly={this.props.submitting}
                      disabled={this.props.submitting}
                      required />
                  </CFormGroup>
                  <CFormGroup>
                    <CTextarea
                      id="description"
                      name="description"
                      placeholder="Short Project Description"
                      value={this.state.description}
                      onChange={this.handleChange}
                      readOnly={this.props.submitting}
                      disabled={this.props.submitting}
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CRow>
                      <CCol lg="6">
                        <CLabel htmlFor="start_date">Start Date</CLabel>
                        <CInput
                          type="datetime-local"
                          id="start_date"
                          placeholder='Start date'
                          name="start_date"
                          value={this.state.start_date}
                          onChange={this.handleChange}
                          readOnly={this.props.submitting}
                          disabled={this.props.submitting}
                          required
                        />
                      </CCol>
                      <CCol lg="6">
                        <CLabel htmlFor="end_date">End Date</CLabel>
                        <CInput
                          type="datetime-local"
                          id="end_date"
                          name="end_date"
                          placeholder="date"
                          value={this.state.end_date}
                          onChange={this.handleChange}
                          readOnly={this.props.submitting}
                          disabled={this.props.submitting}
                          required
                        />
                      </CCol>
                    </CRow>
                  </CFormGroup>
                  <FoxReactSelectFormGroup
                    options={options}
                    inputInfo="contractor"
                    inputValue={this.state.contractor}
                    handleChange={this.handleReactSelect}
                    readOnly={this.props.submitting}
                    disabled={this.props.submitting}
                  />
                  <CFormGroup>
                    <CContainer>
                      <CRow>
                        <CCol>
                          <FoxSwitchGroup
                            groupLabel='Choose the related hazardous work from the list below:'
                            options={permitOptions}
                            handleCheck={this.handleCheck}
                            parentState={this.state}
                            readOnly={this.props.submitting}
                            disabled={this.props.submitting}
                          />
                        </CCol>
                      </CRow>
                    </CContainer>
                  </CFormGroup>


                  <CButton disabled={this.props.submitting} shape="pill" onClick={this.handleDocumentCreationRedirect} color="dark" variant="outline" block><SubmitSpinner submitting={this.props.submitting} />Create Project and go to document creation</CButton>
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
    options: state.entityListTable.tableData
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  getContractorList: ({ ...params }) => dispatch(getContractorList({ ...params })),
  clearList: () => dispatch(clearList())
})

export default connect(mapStateToProps, mapDispatchToProps)(WithLoading(ProjectCreate))