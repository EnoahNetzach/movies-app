import React, { PropTypes } from 'react'
import { Card, CardMedia, CardTitle, CardText } from 'material-ui/Card'

const Impl = ({ movie }) => {
  const title = `${movie.title} (${movie.year})`
  if (document.title !== title) {
    document.title = title
  }

  return (
    <Card>
      {movie.poster ? (
        <CardMedia>
          <div
            style={{
              backgroundColor: '#ddd',
              backgroundImage: `url(${movie.poster})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              height: '350px',
            }}
          />
        </CardMedia>
      ) : null}

      <CardTitle title={movie.title} subtitle={movie.year} />

      <CardText>
        <h4>Director</h4>
        {movie.director}

        {movie.actors.length ? (
          <div>
            <h4>Actors</h4>
            <ul>
              {movie.actors.map((actor) => (
                <li key={actor}>
                  {actor}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <h4>Genre</h4>
        {movie.genre}
      </CardText>
    </Card>
  )
}

Impl.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    actors: PropTypes.arrayOf(PropTypes.string).isRequired,
    poster: PropTypes.string,
  }),
}

export default Impl
