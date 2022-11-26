import axiosClient from './axiosClient';

export const category = {
  movie: 'movie',
  tv: 'tv',
};

export const movieType = {
  top_rate: 'top-rate',
  trending: 'trending',
  action: '/discover/28',
  comedy: '/discover/35',
  horror: 'discover/27',
  romance: 'discover/10749',
  tv_movie: 'discover/10770',
};

export const tvType = {
  top_rated: 'top-rate',
  on_the_air: 'on_the_air',
};

const tmdbApi = {
  getMoviesList: (type, page) => {
    const url = `api/movies/${type}/${page}`;
    const urlDiscover = `api/movies/discover/${type}/${page}`;
    if (type === 'top-rate' || type === 'trending') {
      return axiosClient.get(url);
    } else {
      return axiosClient.get(urlDiscover);
    }
  },
  getGenreList: () => {
    const url = 'api/genreList';
    return axiosClient.get(url);
  },
  getVideos: id => {
    const url = `api/movies/video/${id}`;
    return axiosClient.get(url);
  },
  search: (query, page) => {
    const url = `api/movies/searchMovies/${page}?name=${query.name}&year=${query.year}&discover=${query.discover}&media=${query.media}&language=${query.language}`;
    return axiosClient.get(url);
  },
  detail: id => {
    const url = `api/movies/movieId/${id}`;
    return axiosClient.get(url);
  },
};

export default tmdbApi;
