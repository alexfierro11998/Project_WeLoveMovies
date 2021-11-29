const service = require("./theaters.service");

async function list(req, res){
    const data = await service.list();
    for(let i in data){
      data[i].movies = await service.getMovies(data[i].theater_id);
    }
    res.json({ data: data });
}




module.exports = {
    list
}