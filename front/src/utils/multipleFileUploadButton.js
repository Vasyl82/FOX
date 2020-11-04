import React from "react";
import { connect } from "react-redux";
import CIcon from "@coreui/icons-react";
import { CCol, CFormGroup, CInputFile, CLabel, CRow } from "@coreui/react";
import {
  addNewDocument,
  deleteDocument,
  putAllDocumentsToStore,
} from "../actions";

const MultipleFileUploadButton = (props) => {
  const handleFilesUpload = (event) => {
    event.preventDefault();
    const docs = [...event.target.files];
    props.putAllDocumentsToStore(docs);
  };

  return (
    <CCol className="mb-3">
      <CInputFile
        className="this is my new class name"
        custom
        multiple
        onChange={handleFilesUpload}
        disabled={props.submitting}
        required={props.submitting}
      ></CInputFile>
      <CLabel htmlFor="file-multiple-input" variant="custom-file">
        Choose Files...
      </CLabel>
    </CCol>
  );
};

const mapStateToProps = (state) => ({
  docs: state.projectDocs,
  submitting: state.submitting,
});

const mapDispatchToProps = (dispatch) => ({
  addNewDocument: (document) => dispatch(addNewDocument(document)),
  deleteDocument: (document) => dispatch(deleteDocument(document)),
  putAllDocumentsToStore: (documents) =>
    dispatch(putAllDocumentsToStore(documents)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultipleFileUploadButton);
