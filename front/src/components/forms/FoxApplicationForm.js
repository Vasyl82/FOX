import React, { Component } from 'react';
import { CForm, CFormGroup, CInput, CLabel, CContainer, CRow, CCol } from "@coreui/react";

class FoxLoginForm extends Component {
    render() {
        return (
            <CContainer fluid={true}>
                <CRow className="mt-2 mb-2">
                    <CCol sm="8" className="mx-auto">
                        <CForm action="" method="POST">
                            <CFormGroup>
                                <CLabel htmlFor="username">Name</CLabel>
                                <CInput id="username" name='username' placeholder="Enter your name" required />
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel htmlFor="nf-password">Password</CLabel>
                                <CInput
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter Password.."
                                    required
                                />
                            </CFormGroup>
                            <CFormGroup>
                                <CInput type="submit" value="Submit" color="info" />
                            </CFormGroup>
                        </CForm>
                    </CCol>
                </CRow>
            </CContainer>
        )
    }
}

export default FoxLoginForm