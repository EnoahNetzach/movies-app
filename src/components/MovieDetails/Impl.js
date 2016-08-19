import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import FlatButton from 'material-ui/FlatButton'
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import CircularProgress from 'material-ui/CircularProgress'
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

    {movie ? (
      <Details movie={movie} />
    ) : (
      <div style={{ margin: '0 auto', textAlign: 'center' }}>
        <CircularProgress />
      </div>
    )}
  </div>
)

Impl.propTypes = {
  movie: PropTypes.object,
}

export default Impl
