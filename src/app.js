if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

const moviesRouter = require('./routes/movies/movies.router');
const reviewsRouter = require('./routes/reviews/reviews.router');
const theatersRouter = require('./routes/theaters/theaters.router');

app.use(express.json());

app.use('/movies', moviesRouter);
app.use('/reviews', reviewsRouter);
app.use('/theaters', theatersRouter);
app.use(function (req, res, next) {
    next({ status: 404, message: `Path not found: ${req.originalUrl}` });
});
app.use(function (error, request, response, next) {
    const { status = 500, message = "Something went wrong!" } = error;
    response.status(status).json({ error: message });
});

module.exports = app;
