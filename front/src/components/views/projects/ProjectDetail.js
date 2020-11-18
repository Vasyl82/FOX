import React, { Component } from "react";
import { connect } from "react-redux";
import { getProfileFetch, setProjectId } from "../../../actions";
import {
  CRow,
  CCol,
  CEmbed,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CLink,
} from "@coreui/react";
import { ActivityLog } from "../../activity_log";
import { WithLoading, WithLoadingSpinner } from "../../loadings";

class ProjectDetail extends Component {
  state = {
    name: "",
    location: "",
    description: "",
    start_date: "",
    end_date: "",
    extend_date: "",
    company: this.props.company,
    contractor: "-1",
    work_at_height: false,
    lifting_work: false,
    confined_space: false,
    hot_work: false,
    chemical_handling: false,
    work_alone: false,
    work_at_sensitive_area: false,
    cold_work: false,
    error: false,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleCheck = (event) => {
    this.setState({
      [event.target.name]: event.target.checked,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    if (parseInt(this.state.contractor) < 0) {
      this.setState({
        error:
          "Contractor was not selected! Please, choose contractor form the list",
      });
    } else {
      this.props.changeSubmitState();
      this.formData = this.state;
      delete this.formData.error;
      await foxApi
        .patchEntityOf("projects", this.props.match.params.id, this.formData)
        .then(() => {
          const docsFromStore = [...this.props.docs];
          return Promise.all(
            docsFromStore.map((incomeDoc) => {
              const { backend_action, ...doc } = incomeDoc;
              doc.project = this.props.match.params.id;
              const formData = new FormData();
              if (backend_action !== "None") {
                Object.entries(doc).forEach(([key, value]) => {
                  if (value !== null) {
                    formData.append(key, value);
                  }
                });
                if (doc.id) {
                  return foxApi[backend_action]("documents", doc.id, formData);
                }
                return foxApi[backend_action]("documents", formData);
              }
            })
          );
        })
        .then(() => {
          this.props.history.goBack();
        })
        .catch((error) => {
          const errors = handleError({
            error: error,
            operation: "Project update",
            validationFields: [
              "name",
              "location",
              "description",
              "start_date",
              "end_date",
              "company",
              "contractor",
              "work_at_height",
              "lifting_work",
              "confined_space",
              "hot_work",
              "chemical_handling",
              "work_alone",
              "work_at_sensitive_area",
              "cold_work",
              "file",
              "template",
              "url_to_doc",
              "filled_file",
            ],
          });
          this.setState({
            error: errors,
          });
        })
        .finally(() => this.props.changeSubmitState());
    }
  };

  componentDidMount = async () => {
    this.props.setProjectId(this.props.match.params.id);
    await this.props
      .getProfileFetch()
      .catch((error) => console.log(error))
      .finally(() => this.props.changeLoadingState());
  };

  componentWillUnmount = async () => {
    this.props.setProjectId("");
  };

  render = () => {
    return (
      <React.Fragment>
        <CCard>
          <CCardHeader className="d-flex justify-content-between">
            <CCardTitle>Project details</CCardTitle>
            {this.props.role === "CliAdm" ? (
              <CLink to={`${this.props.location.pathname}/edit`}>
                Edit project
              </CLink>
            ) : null}
          </CCardHeader>
          <CCardBody>
            <CRow>
              <CCol>
                <ActivityLog projectId={this.props.match.params.id} />
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <WithLoadingSpinner loading={this.props.loading}>
                  <CEmbed ratio="16by9">
                    <iframe
                      src={`${window.location.origin}/api/ptw/${this.props.match.params.id}`}
                    />
                  </CEmbed>
                </WithLoadingSpinner>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </React.Fragment>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    username: state.currentUser.username,
    role: state.currentUser.role,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getProfileFetch: () => dispatch(getProfileFetch()),
  setProjectId: (id) => dispatch(setProjectId(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithLoading(ProjectDetail));
