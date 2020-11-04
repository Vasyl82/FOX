import React, { Component } from "react";
import { connect } from "react-redux";
import CIcon from "@coreui/icons-react";
import { CCol, CInputFile, CLabel } from "@coreui/react";
import { addNewDocument } from "../actions";
import { deleteDocument } from "../actions/documents";

class MultipleFileUploadButton extends Component {
  state = {
    lastIndex: 4,
  };

  handleRowAdd = (document) => {
    const { lastIndex } = this.state;
    this.props.addNewDocument(document);
    this.setState({ lastIndex: lastIndex + 1 });
  };

  handleFileUpload = (event) => {
    console.log(event.target.files);
    let docName = event.target.files[0].name.split(".");
    docName.pop();
    docName = docName.join(".");
    this.props.addNewDocument({
      docId: event.target.name,
      name: docName,
      file: event.target.files[0],
      project: null,
    });
    console.log("i have doc info");
  };

  componentDidMount = () => {
    const initialDocs = this.props.docs;
    if (initialDocs.length < 1) {
      this.handleRowAdd({
        docId: `${this.state.lastIndex}-`,
        name: "",
        file: "",
        project: null,
      });
    } else {
      const docIdx = initialDocs.map((doc) =>
        doc.docId ? parseInt(doc.docId.split("-")[0]) : doc.id
      );
      const lastIndex = Math.max(...docIdx);
      this.setState({
        lastIndex: lastIndex + 1,
      });
    }
    console.log("didmount finished");
  };

  render() {
    console.log(this.props.docs);
    const { lastIndex } = this.state;
    const docs = this.props.docs;
    console.log(docs);
    const docsCount = docs.length;
    console.log("list of docs");

    //   this.handleRowAdd({
    //     docId: `${lastIndex}-`,
    //     name: "",
    //     file: "",
    //     project: null,
    //   });

    return (
      <CCol>
        {docs.map((doc, idx) => {
          return (
            <>
              <CInputFile
                custom
                multiple
                name={doc.docId}
                onChange={this.handleFileUpload}
                disabled={this.props.submitting}
                required={this.props.submitting}
              ></CInputFile>
              <CLabel htmlFor="file-multiple-input" variant="custom-file">
                Choose Files...
              </CLabel>
            </>
          );
        })}
      </CCol>
    );
  }
}

const mapStateToProps = (state) => ({
  docs: state.projectDocs,
  submitting: state.submitting,
});

const mapDispatchToProps = (dispatch) => ({
  addNewDocument: (document) => dispatch(addNewDocument(document)),
  deleteDocument: (document) => dispatch(deleteDocument(document)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MultipleFileUploadButton);
