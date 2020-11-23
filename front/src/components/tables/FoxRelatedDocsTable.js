import React from "react";
import { connect } from "react-redux";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CDataTable,
  CRow,
  CLink,
  CLabel,
  CFormGroup,
  CInputFile,
  CInputCheckbox,
} from "@coreui/react";
import { FoxApiService } from "../../services";
import {
  getProfileFetch,
  getDocumentList,
  setProjectId,
  clearList,
} from "../../actions";

const foxApi = new FoxApiService();

const FoxRelatedDocsTable = (props) => {
  const downloadFile = async (doc) => {
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
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader className="d-flex justify-content-between">
            <CCardTitle>{props.tableName}</CCardTitle>
          </CCardHeader>
          <CCardBody>
            <CDataTable
              items={props.tableData ? props.tableData : []}
              fields={[
                { key: "name", label: "Document Name" },
                "uploaded_document",
                "uploaded",
              ]}
              loading={props.loading}
              clickableRows
              hover
              striped
              bordered
              tableFilter={{ placeholder: "Search..." }}
              size="sm"
              itemsPerPage={5}
              itemsPerPageSelect
              pagination
              scopedSlots={{
                name: (item) => (
                  <td>
                    <CCol className="mb-3" sm="9">
                      <CLink
                        value={item.name}
                        onClick={() => downloadFile(item)}
                      >
                        {item.name}
                      </CLink>
                    </CCol>
                  </td>
                ),
                uploaded_document: (item) => (
                  <td>
                    <CCol className="mb-3" sm="5">
                      <CInputFile
                        custom
                        key={item.id}
                        id={item.id}
                        name={item.id}
                        onChange={props.handleFileUpload}
                        disabled={props.submitting}
                        required={props.submitting}
                      />
                      <CLabel variant="custom-file">Choose file</CLabel>
                    </CCol>
                  </td>
                ),
                uploaded: (item) => (
                  <td className="d-flex align-items-center">
                    <CFormGroup variant="checkbox" className="checkbox">
                      <CCol className="mb=1" sm="1">
                        <CInputCheckbox
                          id="checkbox"
                          name="checkbox"
                          value={item.filled_file}
                          checked={item.filled_file === null ? false : true}
                        />
                      </CCol>
                    </CFormGroup>
                  </td>
                ),
              }}
            />
            <CLink
              className="btn btn-pill btn-outline-dark"
              to={`/projects/${props.match.params.id}/ptw`}
            >
              Go To PTW
            </CLink>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

const mapStateToProps = (state) => ({
  role: state.currentUser.role,
  docs: state.projectDocs,
  submitting: state.submitting,
});

const mapDispatchToProps = (dispatch) => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  getDocumentList: ({ ...params }) => dispatch(getDocumentList({ ...params })),
  setProjectId: (id) => dispatch(setProjectId(id)),
  clearList: () => dispatch(clearList()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FoxRelatedDocsTable);
