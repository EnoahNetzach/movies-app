import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import { searchRoute } from '../Routes'
import Details from './Details'

const Impl = ({ movie }) => (
  <div>
    <Link to={searchRoute()}>
      <FlatButton
        label="Back"
        icon={<NavigationArrowBack />}
      />
    </Link>

    {movie ? <Details movie={movie} /> : null}
  </div>
)

Impl.propTypes = {
  movie: PropTypes.object,
}

export default Impl
