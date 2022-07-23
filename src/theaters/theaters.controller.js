const service = require('./theaters.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// Request to retrieve all theaters
async function list(req, res) {
    const { movieId } = req.params
    let data
    if (movieId) {
        data = await service.listTheatersByMovieId(movieId)
    } else {
        data = await service.list()
    }
    res.json({ data })
}

module.exports = {
    list: asyncErrorBoundary(list),
}