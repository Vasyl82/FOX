import React from "react";
import { connect } from "react-redux";
import {
  CCol,
  CFade,
  CCard,
  CLink,
  CCardBody,
  CCardText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { deleteDocument } from "../../actions";

const DocumentWidget = (props) => {
  const handleDocRemove = (event, documentName) => {
    event.preventDefault();
    console.log(event);
    console.log(documentName);
    props.deleteDocument(documentName);
  };

  return (
    <CCol xs="12" sm="6" md="2">
      <CCard>
        <CCardBody>
          <CRow>
            <CCol align="end">
              <CLink
                className="card-header-action"
                onClick={(event) => handleDocRemove(event, props.name)}
              >
                <CIcon name="cil-x-circle" />
              </CLink>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CCardText>{props.name}</CCardText>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  );
};

const mapStateToProps = (state) => ({
  docs: state.projectDocs,
  submitting: state.submitting,
});

const mapDispatchToProps = (dispatch) => ({
  deleteDocument: (document) => dispatch(deleteDocument(document)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DocumentWidget);
