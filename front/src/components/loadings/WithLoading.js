import { CElementCover, CSpinner } from "@coreui/react"
import React, { Component } from 'react'

const withLoading = (WrappedComponent) => {
  return class extends Component {

    state = {
      loading: true,
      submitting: true
    }

    changeLoadingState = () => {
      this.setState({
        loading: !this.state.loading
      })
    }

    render = () => {
      return (
        <WrappedComponent loading={this.state.loading} changeLoadingState={this.changeLoadingState} {...this.props} />
      )
    }
  }
}

export default withLoading