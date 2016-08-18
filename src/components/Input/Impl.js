import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField'

const passEventValue = callback => event => callback(event.target.value)

const Impl = ({ titleSearch, onTitleChange }) => (
  <div>
    <div>
      <TextField
        hintText="Title"
        floatingLabelText="Write a Movie Title"
        value={titleSearch}
        onChange={passEventValue(onTitleChange)}
      />
    </div>
  </div>
)

Impl.propTypes = {
  titleSearch: PropTypes.string,
  onTitleChange: PropTypes.func.isRequired,
}

export default Impl
