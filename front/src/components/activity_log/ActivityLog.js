import React, { Component } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CListGroup,
  CListGroupItem,
  CButton,
  CCollapse,
} from "@coreui/react";
import { FoxApiService } from "../../services";
import { WithLoading, WithLoadingSpinner } from "../loadings";

const foxApi = new FoxApiService();

class ActivityLog extends Component {
  state = {
    items: [],
    show: false,
  };

  handleClick = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  componentDidMount = () => {
    foxApi
      .getEntityList("activities", { project_id: this.props.projectId })
      .then((data) => {
        this.setState({
          items: data,
        });
      })
      .then(() => this.props.changeLoadingState())
      .catch((error) => console.log(error));
  };

  render = () => {
    const { items, show } = this.state;
    return (
      <CCard>
        <CCardHeader
          className={show ? "fox-activity_log" : "fox-activity_log-hidden"}
        >
          <strong>Activity log</strong>
          <CButton color="link" onClick={this.handleClick}>
            {show ? "Hide" : "Show"}
          </CButton>
        </CCardHeader>
        <CCollapse show={show}>
          <WithLoadingSpinner loading={this.props.loading}>
            <CCardBody>
              <CListGroup flush>
                {items
                  ? items.map((item) => {
                      return (
                        <CListGroupItem key={item.id}>
                          {item.message}
                        </CListGroupItem>
                      );
                    })
                  : null}
              </CListGroup>
            </CCardBody>
          </WithLoadingSpinner>
        </CCollapse>
      </CCard>
    );
  };
}

export default WithLoading(ActivityLog);
