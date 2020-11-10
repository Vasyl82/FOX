import React from "react";
import { connect } from "react-redux";
import { CCol, CCard, CLink, CCardBody, CCardText, CRow } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { deleteDocument } from "../../actions";
import { FoxApiService } from "../../services";

const foxApi = new FoxApiService();

const DocumentWidget = (props) => {
  const handleDocRemove = (event, documentName) => {
    event.preventDefault();
    props.deleteDocument(documentName);
  };

  const truncateDocName = (docName, maxlength = 45) => {
    let arraydocNameWithExtensionType = props.doc.name.split(".");
    const docExtensionType = arraydocNameWithExtensionType.pop();

    return docName.length > maxlength
      ? docName.slice(0, maxlength - 1) + "…" + docExtensionType
      : docName;
  };

  const downloadFile = async (doc, e) => {
    if (doc.id) {
      await foxApi
        .downloadDocument(doc.id)
        .then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement("a");
          link.href = url;
          const filename = doc.name.split("/").pop();
          link.setAttribute("download", filename);
          document.body.appendChild(link);
          link.click();
          link.parentNode.removeChild(link);
        })
        .catch((error) => {
          console.error("File download failed!");
          console.error(error);
        });
    } else {
      const url = window.URL.createObjectURL(new Blob([doc.file]));
      const link = document.createElement("a");
      link.href = url;
      const filename = doc.name.split("/").pop();
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    }
  };

  return (
    <CCol xs="12" sm="6" md="4" lg="3" xl="2">
      <CCard>
        <CCardBody className="document-card">
          <CRow>
            <CCol align="end">
              <CLink
                className="card-header-action"
                onClick={(event) => handleDocRemove(event, props.doc.name)}
              >
                <CIcon name="cil-x-circle" />
              </CLink>
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CCardText className="document-card-text">
                <CLink onClick={() => downloadFile(props.doc)}>
                  {truncateDocName(props.doc.name)}
                </CLink>
              </CCardText>
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
