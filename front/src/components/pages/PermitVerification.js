import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  CSpinner,
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
} from "@coreui/react";
import { FoxApiService } from "../../services";
import { WithLoading, WithLoadingSpinner } from "../loadings";

const foxApi = new FoxApiService();

class PermitVerification extends Component {
  state = {
    verified: false,
    verification_info: {},
  };

  componentDidMount = () => {
    const { part1, part2, part3 } = this.props.match.params;
    foxApi
      .verifyPermit(part1, part2, part3)
      .then((data) => {
        if (data.detail === "Not found.") {
          this.props.changeLoadingState();
        } else {
          this.setState({
            verification_info: data,
            verified: true,
          });
          this.props.changeLoadingState();
        }
      })
      .catch((error) => {
        console.log(error);
        this.props.changeLoadingState();
      });
  };

  render = () => {
    const { verification_info, verified } = this.state;

    return this.props.currentUser.username ? (
      <div className="c-app c-default-layout flex-row align-items-center">
        <CContainer>
          <CRow>
            <CCol>
              <WithLoadingSpinner loading={this.props.loading}>
                <CCard>
                  <CCardBody className="d-flex flex-column align-items-center">
                    {verified ? (
                      <React.Fragment>
                        <h1>
                          <strong className="text-success">
                            ACCESS GRANTED
                          </strong>
                        </h1>
                        <p>
                          <strong>Worker name:</strong> {verification_info.name}
                        </p>
                      </React.Fragment>
                    ) : (
                      <h1>
                        <strong className="text-danger">You do not have the permission to Scan the QR Code</strong>
                      </h1>
                    )}
                  </CCardBody>
                </CCard>
              </WithLoadingSpinner>
            </CCol>
          </CRow>
        </CContainer>
      </div>
    ) : (
      <Redirect to="/login" />
    );
  };
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
};

export default connect(mapStateToProps, null)(WithLoading(PermitVerification));
