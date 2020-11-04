import React from "react";
import {
  CWidgetSimple,
  CButtonClose,
  CCol,
  CFade,
  CCard,
  CLink,
  CCardBody,
  CCardText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const handleClose = (event) => {
  event.preventDefault();
  console.log("Close Button clicked!");
};

export default function DocumentWidget() {
  return (
    <CCol xs="12" sm="6" md="2">
      <CFade in={true}>
        <CCard>
          <CCardBody>
            <CRow>
              <CCol align="end">
                <CLink className="card-header-action" onClick={handleClose}>
                  <CIcon name="cil-x-circle" />
                </CLink>
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <CCardText>docname.doc</CCardText>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CFade>
    </CCol>
  );
}
