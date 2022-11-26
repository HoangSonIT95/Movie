const express = require('express');
const cors = require('cors');
const app = express();
const movieRouter = require('./routes/movie');
const login = require('./controllers/login');
const authToken = require('./middleware/authToken');
const { getGenreList } = require('./controllers/genreList');

app.use(express.json()); // for parsing application/json
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.urlencoded({ extended: true }));

app.post('/login', login.authLogin);
app.get('/api/genreList', authToken.authToken, getGenreList);
app.use('/api/movies', authToken.authToken, movieRouter);
app.use((req, res) => {
  res.status(404).send('Route not found');
});

app.listen(5000);
