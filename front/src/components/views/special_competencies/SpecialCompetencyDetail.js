import React, { Component } from 'react'
import { getProfileFetch } from '../../../actions'
import { connect } from 'react-redux'
import {
  CForm,
  CFormGroup,
  CInput,
  CLabel, CRow,
  CCol,
  CButton,
  CLink
} from "@coreui/react";
import DjangoCSRFToken from 'django-react-csrftoken'
import { FoxApiService } from '../../../services'
import { FoxFormGroupInputDownloadUpload } from '../../forms'
import { DeleteModal } from '../../modals'

const foxApi = new FoxApiService();

class WorkerDetail extends Component {

  state = {
    worker: this.props.match.params.id,
    name: "",
    file: "",
    issued_by: "",
    modal: false,
    error: false,
    filename: "",
    doc_type: "",
    upload_files: {}
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleFileUpload = event => {
    const { upload_files } = this.state;
    upload_files[event.target.name] = event.target.files[0];
    this.setState({
      upload_files: upload_files,
      [event.target.name]: ""
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    this.requestData = this.state;
    const { upload_files } = this.requestData
    delete this.requestData.modal
    delete this.requestData.upload_files
    delete this.requestData.error;
    delete this.requestData.filename;
    delete this.requestData.doc_type;
    this.formData = new FormData
    Object.entries(this.requestData).forEach(([key, value]) => {
      this.formData.append(key, value);
    });
    upload_files ? Object.entries(upload_files).forEach(([key, value]) => {
      this.formData.append(key, value)
    }) : null;
    await foxApi.patchEntityWithFiles('worker_special_competencies', this.props.match.params.competency_id, this.formData)
      .then(() => {
        this.props.history.goBack()
      },
        (error) => {
          console.error(error);
          this.setState({
            error: 'Competency update failed!' +
              ' Please check your input and try again!' +
              ' In case this problem repeats, please contact your administrator!'
          })
        })
  }

  confirmDelete = async () => {
    await foxApi.deleteEntityOf('worker_special_competencies', this.props.match.params.competency_id)
      .then(() => {
        this.props.history.goBack()
      },
        (error) => {
          console.error(error);
          this.setState({
            error: 'Could not delete competency!' +
              ' Please check your input and try again!' +
              ' In case this problem repeats, please contact your administrator!'
          })
        })
    console.log(`delete special competency ${this.props.match.params.competency_id}`);
  }

  downloadFile = async (e) => {
    this.setState({
      filename: e.target.value,
      doc_type: e.target.name
    }
      , () => {
        foxApi.downloadWorkerCompetency(this.props.match.params.id, this.state.doc_type)
          .then((blob) => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            const filename = this.state.filename.split('/').pop();
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
          })
          .catch((error) => {
            console.error('File download failed!');
            console.error(error)
          })
      }
    )
  }

  setModalVisibility = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  componentDidMount = async () => {
    await this.props.getProfileFetch()
      .then(() => foxApi.getDetailsOf('worker_special_competencies', this.props.match.params.competency_id))
      .then((data) => this.setState({ ...data }))
  }

  render = () => {
    return (
      <CRow>
        <CCol>
          <CForm
            onSubmit={this.handleSubmit}
          >
            <DjangoCSRFToken />
            <FoxFormGroupInputDownloadUpload
              inputValue={this.state.name}
              downloadValue={this.state.file}
              handleChange={this.handleChange}
              handleFileUpload={this.handleFileUpload}
              inputInfo="name"
              uploadInfo="file"
              downloadFile={this.downloadFile}
            />

            <CFormGroup>
              <CLabel htmlFor="issued_by">Competency issued by</CLabel>
              <CInput
                id="issued_by"
                name='issued_by'
                placeholder="Enter legal entity"
                value={this.state.issued_by}
                onChange={this.handleChange}
              />
            </CFormGroup>
            <CFormGroup>
              <CButton type="submit" color="dark" variant="outline" block>Save changes</CButton>
            </CFormGroup>
            <CButton className="mb-3" color="danger" variant="outline" onClick={this.setModalVisibility} block>Delete Competency</CButton>
            {this.state.error
              ? <p>{this.state.error}</p>
              : null
            }
          </CForm>
          <DeleteModal
            setModalVisibility={this.setModalVisibility}
            danger={this.state.modal}
            entity="special competency"
            confirmDelete={this.confirmDelete}
          />
        </CCol>
      </CRow >
    )
  }
}

const mapStateToProps = state => {
  return {
    contractor: state.currentUser.id,
  }
}

const mapDispatchToProps = dispatch => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkerDetail)
