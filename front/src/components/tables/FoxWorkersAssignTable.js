import React, { Component } from "react";
import {
  CCard,
  CCardBody,
  CCardSubtitle,
  CDataTable,
  CInputCheckbox,
} from "@coreui/react";
import { connect } from "react-redux";

class FoxWorkersAssignTable extends Component {
  setFields = (noCheckBoxes) => {
    console.log(this.props);
    const baseFields = ["worker_name", "identification_no"];
    if (noCheckBoxes) {
      return baseFields;
    }
    baseFields.push({
      key: "chosen",
      label: (
        <CInputCheckbox
          className="fox-table-checkbox"
          checked={
            JSON.stringify(this.props.workers) ===
            JSON.stringify(this.props.items.map((worker) => worker.id))
          }
          onChange={this.props.handleCheckAll}
        />
      ),
    });
    return baseFields;
  };
  render() {
    return (
      <>
        <CCardSubtitle className="pt-2 mb-1">Personal Involved:</CCardSubtitle>
        <CCard>
          <CCardBody>
            <CDataTable
              items={this.props.items ? this.props.items : []}
              fields={this.setFields(this.props.noCheckBoxes)}
              loading={this.props.loading}
              clickableRows
              hover
              striped
              tableFilter={{ placeholder: "Search..." }}
              size="sm"
              itemsPerPage={5}
              pagination
              scopedSlots={{
                worker_name: (item) => <td>{item.name}</td>,
                identification_no: (item) => <td>{`ID-${item.id}`}</td>,
                chosen: (item) => (
                  <td className="d-flex align-items-center">
                    <CInputCheckbox
                      className="fox-table-checkbox"
                      name={item.id}
                      checked={this.props.workers.includes(item.id)}
                      onChange={this.props.handleCheck}
                      readOnly={
                        this.props.submitting || this.props.disablePermanently
                      }
                      disabled={
                        this.props.submitting || this.props.disablePermanently
                      }
                    />
                  </td>
                ),
              }}
            />
          </CCardBody>
        </CCard>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  workerList: state.entityListTable.tableData,
});

FoxWorkersAssignTable.defaultProps = {
  items: [],
};

export default connect(mapStateToProps, null)(FoxWorkersAssignTable);
