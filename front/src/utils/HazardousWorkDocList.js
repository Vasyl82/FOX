import React, { Component } from "react";
import { connect } from "react-redux";
import CIcon from "@coreui/icons-react";
import { CButton, CCol, CInputFile, CLabel } from "@coreui/react";
import { addNewDocument } from "../actions";
import { deleteDocument } from "../actions/documents";

class HazardousWorkDocList extends Component {
  state = {
    lastIndex: 1,
  };

  handleRowAdd = (document) => {
    const { lastIndex } = this.state;
    this.props.addNewDocument(document);
    this.setState({ lastIndex: lastIndex + 1 });
  };

  handleRowRemove = (documentId) => {
    this.props.deleteDocument(documentId);
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
      hazardous_work: this.props.hazardousWork,
    });
  };

  componentDidMount = () => {
    const initialDocs = this.props.docs.filter(
      (doc) => doc.hazardous_work == this.props.hazardousWork
    );
    if (initialDocs.length < 1) {
      this.handleRowAdd({
        docId: `${this.state.lastIndex}-${this.props.hazardousWork}`,
        name: "",
        file: "",
        project: null,
        hazardous_work: this.props.hazardousWork,
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
    console.log("did mount finished");
  };

  componentWillUnmount = () => {};

  render() {
    console.log(this.props.docs);
    const { lastIndex } = this.state;
    const docs = this.props.docs.filter(
      (doc) => doc.hazardous_work == this.props.hazardousWork
    );
    console.log(docs);
    const docsCount = docs.length;

    return docs ? (
      <CCol>
        {docs.map((doc, idx) => {
          return (
            <>
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
              {idx === docsCount - 1 ? (
                <CButton
                  variant="ghost"
                  size="sm"
                  shape="pill"
                  color="success"
                  onClick={() =>
                    this.handleRowAdd({
                      docId: `${lastIndex}-${this.props.hazardousWork}`,
                      name: "",
                      file: "",
                      project: null,
                      hazardous_work: this.props.hazardousWork,
                    })
                  }
                >
                  <CIcon name="cilPlus" />
                </CButton>
              ) : (
                <CButton
                  variant="ghost"
                  size="sm"
                  shape="pill"
                  color="danger"
                  onClick={() => this.handleRowRemove(doc.docId)}
                >
                  <CIcon name="cilTrash" />
                </CButton>
              )}
            </>
          );
        })}
      </CCol>
    ) : null;
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
)(HazardousWorkDocList);
