import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  CSpinner,
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody
} from '@coreui/react';
import { FoxApiService } from '../../services';

const foxApi = new FoxApiService();

const LoadingSpinner = (
  <div className="pt-3 text-center">
    <CSpinner size="sm" variant="grow" style={{ width: '4rem', height: '4rem' }} />
  </div>
)

class PermitVerification extends Component {

  state = {
    loading: true,
    verified: false,
    verification_info: {}
  }

  componentDidMount = () => {
    const { part1, part2, part3 } = this.props.match.params
    foxApi.verifyPermit(part1, part2, part3)
      .then(data => {
        if (data.detail === "Not found.") {
          this.setState({
            loading: false
          })
        }
        else {
          this.setState({
            loading: false,
            verification_info: data,
            verified: true
          })
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
        })
      })

  }

  render = () => {
    const { loading, verification_info, verified } = this.state
    if (loading) {
      return (
        LoadingSpinner
      )
    }
    else {
      return (
        this.props.currentUser.username ?
          <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
              <CRow>
                <CCol>
                  <CCard>
                    <CCardBody className="d-flex flex-column align-items-center">
                      {verified ?
                        <React.Fragment>
                          <h1><strong className="text-success">ACCESS GRANTED</strong></h1>
                          <p><strong>Worker name:</strong> {verification_info.name}</p>
                        </React.Fragment>
                        : <h1><strong className="text-danger">ACCESS DENIED</strong></h1>}
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CContainer >
          </div>


          : <Redirect to="/login" />
      )
    }

  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
  }
}

export default connect(mapStateToProps, null)(PermitVerification)
