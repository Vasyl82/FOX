import React from "react";
import { CFormGroup, CLabel, CSwitch } from "@coreui/react";

const makeLabel = (inputString) => {
  return inputString
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const makeChoiceName = (inputString) => {
  return inputString
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("_");
};

const FoxSwitchGroup = (props) => {
  return (
    <React.Fragment>
      <div className="mb-2 ">
        <strong>{props.groupLabel}</strong>
      </div>
      {props.options.map((option, idx) => {
        return (
          <CFormGroup className="d-flex align-items-center" key={idx}>
            <CSwitch
              className="mr-2"
              id={option}
              name={option}
              value={option}
              shape={"pill"}
              variant={"3d"}
              color={"success"}
              size={"sm"}
              onChange={props.handleCheck}
              checked={props.parentState[option]}
              disabled={props.disabled}
              readOnly={props.readOnly}
            />
            <CLabel
              variant="checkbox"
              className="form-check-label"
              htmlFor={option}
            >
              {makeLabel(option)}
            </CLabel>
          </CFormGroup>
        );
      })}
    </React.Fragment>
  );
};

export default FoxSwitchGroup;
