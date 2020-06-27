const mongoose = require('mongoose');
let dbURI = process.env.NODE_ENV === 'test' ? process.env.DB_CONNECT_TESTS : process.env.DB_CONNECT

mongoose.connect(dbURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
})
	.then(res => console.log(process.env.NODE_ENV, res.connections[0].name))
	.catch(e => {
		console.error('Connection error', e.message);
	});

const db = mongoose.connection;

module.exports = db;
