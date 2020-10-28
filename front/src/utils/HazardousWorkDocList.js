import React, { Component } from 'react'
import { connect } from 'react-redux'
import CIcon from '@coreui/icons-react'
import { CButton, CCol } from '@coreui/react'
import { FoxFormGroupWithUpload } from '../components/forms'

class HazardousWorkDocList extends Component {

    state = {
        items: [{ id: 1 }, { id: 2 }],
        itemsCount: 2
    }

    handleRowAdd = () => {
        console.log("Row added");
    }

    handleRowRemove = () => {
        console.log("Row removed");
    }

    componentDidMount = () => {
        console.log("list mounted");
    }

    render() {
        const { items, itemsCount } = this.state
        return (
            items ? items.map((item) => {
                console.log(item);
                const [key, value] = Object.entries(item)[0]
                console.log(value, itemsCount);
                return (
                    < React.Fragment key={value} >
                        <CCol lg="7">
                            <FoxFormGroupWithUpload
                                inputValue='check'
                                handleChange={this.props.handleChange}
                                handleFileUpload={this.props.handleFileUpload}
                                inputInfo="input_document_name"
                                uploadInfo="file"
                                disabled={this.props.submitting}
                                readOnly={this.props.submitting}
                            />
                        </CCol>
                        <CCol lg="2">
                            {value == itemsCount ? <CButton shape="pill" color="success" onClick={this.handleRowAdd}>
                                <CIcon name="cilPlus" /></CButton> : <CButton shape="pill" color="danger" onClick={this.handleRowRemove}>
                                    <CIcon name="cilTrash" /></CButton>}
                        </CCol>
                    </React.Fragment >
                )
            }
            )
                : null
        )
    }
}

const mapStateToProps = state => {
    docs: state.projectDocs
}

// const mapDispatchToProps = dispatch => {
//   pass
// }

export default connect(mapStateToProps, null)(HazardousWorkDocList)