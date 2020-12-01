import React from "react";
import { connect } from "react-redux";
import { FileCheckService } from "../../services";

const fileCheck = new FileCheckService();

const InvalidDocumentTotalSizeError = (props) => {

    if (fileCheck.moreThen32MB(props.docs)){
      return (
        <p className="fox-form-invalid-feedback">The total size of files exceeds 32 megabytes.</p>
        )
      }
      else {
        return null;
      }
}

const mapStateToProps = (state) => ({
  docs: state.projectDocs,
});

export default connect(mapStateToProps, null)(InvalidDocumentTotalSizeError);
