const express = require('express');
const officalMoviesRoute = express.Router();
const bodyParser = express.json();
const xss = require('xss');
const services = require('../officalMovies-services/services');
const app = require('../src/app');

officalMoviesRoute
	.route('/favorites')
	.get((req, res, next) => {
       const connection= req.app.get('db');     

        services.getAllFavoriteMovies(connection).then((movies)=>res.status(200).json(movies))
        
	})
	.post(bodyParser, (req, res, next) => {
        const connection= req.app.get('db');    
		const {
			id,
			backdrop_path,
			poster_path,
			imdb_id,
			original_language,
			original_title,
			overview,
			tagline,
			vote_average,
			release_date
        } = req.body;
   
        const movieInfo = {
			id,
			backdrop_path,
			poster_path,
			imdb_id,
			original_language,
			original_title,
			overview,
			tagline,
			vote_average,
			release_date
        }

   services.insertFavoriteMovie(connection,movieInfo).then((movie)=>{
          res.status(201).json(movie);
      })
      
	});

module.exports = officalMoviesRoute;
