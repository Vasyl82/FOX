import React from "react";
import { connect } from "react-redux";
import { CCol, CInputFile, CLabel } from "@coreui/react";
import { putAllDocumentsToStore } from "../actions";
import { FileCheckService } from "../services";
import { putAllDocumentsInvalidNamesToStore } from  "../actions/documents";

const fileCheck = new FileCheckService();

const MultipleFileUploadButton = (props) => {
  const handleFilesUpload = (event) => {
    event.preventDefault();
    console.log(event.target.files);
    const files = [...event.target.files];

    const arrayWithDocsForUpload = [];
    const arrayWithInvalidDocsNames = []

    files.forEach((file) => {
      props.addInvalidDocsNames([]);
      if (fileCheck.checkDocsType(file) === true){
      const fileObject = {
        name: file.name,
        file: file,
        size: file.size
      };
      arrayWithDocsForUpload.push(fileObject);
    } else {
      const invalidFileName = file.name
      arrayWithInvalidDocsNames.push(invalidFileName)
    }
    });

    props.addInvalidDocsNames(arrayWithInvalidDocsNames);
    props.putAllDocumentsToStore(arrayWithDocsForUpload);
    event.target.value = null;
    console.log(event.target.files);
  };

  return (
    <CCol className="mb-3" sm="3">
      <CInputFile
        id="file-multiple-input"
        custom
        multiple
        onChange={handleFilesUpload}
        disabled={props.submitting}
        required={props.submitting}
      />
      <CLabel htmlFor="file-multiple-input" variant="custom-file">
        Choose files...
      </CLabel>
    </CCol>
  );
};

const mapStateToProps = (state) => ({
  docs: state.projectDocs,
  submitting: state.submitting,
});

const mapDispatchToProps = (dispatch) => ({
  putAllDocumentsToStore: (documents) =>
    dispatch(putAllDocumentsToStore(documents)),
    addInvalidDocsNames: (names) => dispatch(putAllDocumentsInvalidNamesToStore(names))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultipleFileUploadButton);
