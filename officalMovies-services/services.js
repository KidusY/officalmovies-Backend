const services = {
	getAllFavoriteMovies(db) {
		return db.select('*').from('favoritemovies');
	},
	getFavoriteMovie(db, id) {
		return db.select('*').from('favoritemovies').where('id', id).first();
	},

	insertFavoriteMovie(db, movie) {
        console.log(movie);
		return db
			.insert([ movie ])
			.into('favoritemovies')
			.returning('*')
			.then((rows) => {
				return rows[0];
			})
			.catch((err) => console.log(err));
	}
};

module.exports = services;
