import React from "react";
import { connect } from "react-redux";


const InvalidFileTrueMessage = (props) =>  {
    const generateErrorMessage = (invalidDocsNames) =>
      invalidDocsNames.map(filename => `The "${filename}" file has an incorrect extension type. `).join("\n");
    if (props.invalidDocsNames.length > 0 ){
      return (
      <p className="fox-form-invalid-feedback">{generateErrorMessage(props.invalidDocsNames)}</p>
      )
    }
    else {
      return null;
    }
  }

InvalidFileTrueMessage.defaultProps = {
  invalidDocsNames: [],
}

const mapStateToProps = (state) => ({
  invalidDocsNames: state.invalidFilesNames,
});

export default connect(mapStateToProps, null)(InvalidFileTrueMessage)
