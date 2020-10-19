import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { changeSubmitState } from '../../actions'

const initialWithLoading = (WrappedComponent) => {
  return class extends Component {

    state = {
      loading: true,
    }

    changeLoadingState = () => {
      this.setState({
        loading: !this.state.loading
      })
    }

    render = () => {
      const { loading } = this.state
      const { dispatch, ...rest } = this.props
      return (
        <WrappedComponent loading={loading} submitting={this.props.submitting} changeLoadingState={this.changeLoadingState} changeSubmitState={this.props.changeSubmitState} {...rest} />
      )
    }
  }
}

const mapStateToProps = state => ({
  submitting: state.submitting
})

const mapDispatchToProps = dispatch => ({
  changeSubmitState: () => dispatch(changeSubmitState())
})

const WithLoading = compose(connect(mapStateToProps, mapDispatchToProps), initialWithLoading)

export default WithLoading