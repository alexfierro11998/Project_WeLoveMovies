const knex = require("../../db/connection");

function list(){
    return knex("theaters")
        .orderBy('theater_id')
        .distinct('*')
}

function getMovies(theater_id){
  return knex("movies_theaters as mt")
    .join("movies as m", 'mt.movie_id', 'm.movie_id')
    .select('m.*')
    .where({'mt.theater_id': theater_id})
}

module.exports = {
    list,
    getMovies,
}