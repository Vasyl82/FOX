import React, { Component } from 'react';
import { CContainer, CRow, CCol, CCard, CCardHeader, CCardBody, CCardFooter } from "@coreui/react";
import FoxApplicationForm from "../forms/FoxApplicationForm"

class FoxApplicationCard extends Component {
    render() {
        return (
            <CContainer fluid={true}>
                <CRow className="mt-5">
                    <CCol sm="4" className="mx-auto align-self-center">
                        <CCard>
                            <CCardHeader color='dark' textColor='light'>
                                Login
                            </CCardHeader>
                            <FoxApplicationForm />
                        </CCard>
                    </CCol>
                </CRow>
            </CContainer>
        )
    }
}

export default FoxApplicationCard;
