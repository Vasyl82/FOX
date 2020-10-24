import React, { Component } from "react";
import { CButtonGroup, CButton, CFormGroup, CCollapse } from "@coreui/react";


class AlternativeInputs extends Component {
  state = {
    active_option: this.props.active_option,
  };

  handleCheck = (newOption) => {
    this.setState({
      active_option: newOption,
    });
  };

  render() {
    const { active_option } = this.state;
    return (
      <CFormGroup>
        <CFormGroup>
          <CButtonGroup>
            <CButton
              className="fox-option-choice-button"
              onClick={() => this.handleCheck("card_number_id")}
              shape="pill"
              disabled={this.props.submitting}
              color="dark"
              variant="outline"
              active={active_option === "card_number_id"}
            >
              Card Number ID
            </CButton>
            <CButton
              className="fox-option-choice-button"
              onClick={() => this.handleCheck("passport")}
              shape="pill"
              disabled={this.props.submitting}
              color="dark"
              variant="outline"
              active={active_option === "passport"}
            >
              Passport
            </CButton>
          </CButtonGroup>
        </CFormGroup>
        <CCollapse show={active_option === "card_number_id"}>
          {React.cloneElement(this.props.optionA, {
            required: active_option === "card_number_id",
          })}
        </CCollapse>
        <CCollapse show={active_option === "passport"}>
          {React.cloneElement(this.props.optionB, {
            required: active_option === "passport",
          })}
        </CCollapse>
      </CFormGroup>
    );
  }
}

AlternativeInputs.defaultProps = {
  active_option: "card_number_id",
};

export default AlternativeInputs;
