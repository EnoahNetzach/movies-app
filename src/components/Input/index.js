import React from 'react'
import { connect } from 'react-redux'
import { search } from '../../actions/movie'
import Impl from './Impl'

const Input = props => <Impl {...props} />

Input.propTypes = {
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  onTitleChange: title => dispatch(search(title))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Input)
