import React, { PropTypes } from 'react'

const Impl = ({ movie }) => {
  const title = `${movie.title} (${movie.year})`
  if (document.title !== title) {
    document.title = title
  }

  return (
    <div>
      {movie.poster ? (
        <span><img src={movie.poster} role="presentation" /><br /></span>
      ) : null}

      <strong>Title</strong> {movie.title}<br />
      <strong>Year</strong> {movie.year}<br />
      <strong>Director</strong> {movie.director}<br />

      <strong>Actors</strong><br />
      <ul>
        {movie.actors.map((actor) => (
          <li key={actor}>
            {actor}
          </li>
        ))}
      </ul>
    </div>
  )
}

Impl.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    actors: PropTypes.arrayOf(PropTypes.string).isRequired,
    poster: PropTypes.string,
  }),
}

export default Impl
