const service = require("./movies.service");

async function fetch(req,res, next){
    const {is_showing} = req.query;
    const data = await service.list();
    if(is_showing){
      const newData = await service.getShowing();
      res.json({data: newData});
    }
    if(!is_showing){
      res.json({data: data});
    }
}


async function checksForExisting(req,res,next){
  const {movieId} = req.params;
  const movie = await service.read(movieId);
  if(movie.length){
    res.locals.movie = movie;
    return next();
  }
  next({status: 404, message: `${movieId} not found.`});
}

async function read(req, res){
  res.json({data: res.locals.movie[0]});
}

async function getTheaters(req, res, next){
  const {movieId} = req.params;
  const theaters = await service.readTheaters(movieId);
  res.json({data: theaters});
}

async function getReviews(req, res, next){
  const {movieId} = req.params;
  const reviews = await service.readReviews(movieId);
  for(let i in reviews){
    reviews[i].critic = await service.getCritic(reviews[i].critic_id)
    console.log(reviews[i])
  }
  res.json({data: reviews});
}

module.exports = {
    fetch,
    read: [checksForExisting, read],
    readTheaters: [checksForExisting, getTheaters],
    readReviews: [checksForExisting, getReviews],
}