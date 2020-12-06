import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FoxApiService } from '../../services'
import { getProjectList, updateModal } from '../../actions'
import { CDropdown, CDropdownToggle, CDropdownItem, CDropdownMenu } from '@coreui/react'
import CIcon from '@coreui/icons-react'


const foxApi = new FoxApiService();

const choices = [
  { Started: 'Started' },
  { Completed: 'Completed' },
  { Extended: 'Extended' },
  { Closed: 'Closed' },
]


class WorkStatusDropdown extends Component {

  handleClick = async (value) => {
    if (value === "Extended") {
      this.props.showExtendModal({ modalType: "extendModal", projectId: this.props.item.id, updateList: this.props.updateList })
    } else {
      await foxApi.patchEntityOf("projects", this.props.item.id, { status: value })
        .then(() => {
          this.props.getProjectList();
        })
    }
  }

  render = () => {
    return (
      this.props.role === "CliAdm" && this.props.item.project_status !== "Application processing" ?
        <React.Fragment>
          <CDropdown >
            <CDropdownToggle className="project-table-toggle">
              <CIcon
                style={{ margin: "0" }}
                className="table-dropdown-icon"
                name={'cilSettings'} />
            </CDropdownToggle>
            <CDropdownMenu className="p-0 foxtable-dropdown-menu" placement="right">
              {choices.map((choice, idx) => {
                const [value, name] = Object.entries(choice)[0]
                return <CDropdownItem
                  key={idx}
                  value={value}
                  onClick={event => this.handleClick(value, event)}
                >{name}</CDropdownItem>
              })}

            </CDropdownMenu>
          </CDropdown >
        </React.Fragment>
        : null
    )
  }

}

const mapStateToProps = state => ({
  role: state.currentUser.role
})

const mapDispatchToProps = dispatch => ({
  getProjectList: ({ ...kwargs }) => dispatch(getProjectList({ ...kwargs })),
  showExtendModal: ({ modalType, ...rest }) => dispatch(updateModal({ modalType, ...rest }))
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkStatusDropdown)
