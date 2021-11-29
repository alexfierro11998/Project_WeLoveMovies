const knex = require("../../db/connection");
const tableName = 'movies';

function list(){
    return knex('movies').select('*');
}

function getShowing(){
  return knex('movies as m')
    .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
    .distinct('m.*', 'mt.is_showing')
    .where({'mt.is_showing': true})
}

function read(movieId){
  return knex('movies')
    .select('*')
    .where({movie_id: movieId})
}

function readTheaters(movieId){
  return knex('movies as m')
    .join('movies_theaters as mt', 'm.movie_id', 'mt.movie_id')
    .join('theaters as t', 'mt.theater_id', 't.theater_id')
    .select('t.*')
    .where({'mt.movie_id': movieId})
}

function readReviews(movieId) {
	return knex("reviews")
		.select("*")
		.where({ movie_id: movieId });
}

function getCritic(criticId) {
	return knex("critics")
		.select("*")
		.where({ critic_id: criticId })
		.first();
}


module.exports = {
    list,
    read,
    readTheaters,
    readReviews,
    getShowing,
    getCritic,
}