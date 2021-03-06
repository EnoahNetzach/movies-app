import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField'

const passEventValue = callback => event => callback(event.target.value)

const Impl = ({ titleSearch, onTitleChange }) => (
  <div>
    <div>
      <TextField
        hintText="Title"
        floatingLabelText="Search a Movie Title"
        value={titleSearch}
        onChange={passEventValue(onTitleChange)}
        errorText={titleSearch.length === 1 ? 'Write more than one character' : undefined}
      />
    </div>
  </div>
)

Impl.propTypes = {
  titleSearch: PropTypes.string,
  onTitleChange: PropTypes.func.isRequired,
}

export default Impl
