const knex = require("../db/connection")
const reduceProperties = require("../utils/reduce-properties");

const reduceMovies =
reduceProperties("theater_id", {
  movie_id: ["movies", null, "movie_id"],
  title: ["movies", null, "title"],
  rating: ["movies", null, "rating"],
  runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
});

// All theaters & movies each theater is showing
function list() {
    return knex("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .join("movies as m", "m.movie_id", "mt.movie_id")
    .select("*")
    .then(reduceMovies)
}

function listTheatersByMovieId(movie_id) {
    return knex('theaters as t')
        .join('movies_theaters as mt', 't.theater_id', 'mt.theater_id')
        .select('t.*', 'is_showing', 'movie_id')
        .where({ movie_id })
}
module.exports = {
    list,
    listTheatersByMovieId
}