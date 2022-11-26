import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { OutlineButton } from '../components/button/Button';
import HeroSlide from '../components/hero-slide/HeroSlide';
import MovieList from '../components/movie-list/MovieList';

import tmdbApi, { category, movieType } from '../api/tmdbApi';

const Home = () => {
  const token = JSON.parse(localStorage.getItem('token'));
  if (!token) {
    window.location.href = '/';
  }
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    const getGenreList = async () => {
      const res = await tmdbApi.getGenreList();
      if (res !== null) {
        setGenreList(res);
      }
    };
    getGenreList();
  }, []);

  return (
    <>
      <HeroSlide />
      <div className='container'>
        <div className='section mb-3'>
          <div className='section__header mb-2'>
            <h2>Trending Movies</h2>
            <Link to='/movie/discover/trending'>
              <OutlineButton className='small'>View more</OutlineButton>
            </Link>
          </div>
          <MovieList type={movieType.trending} />
        </div>

        <div className='section mb-3'>
          <div className='section__header mb-2'>
            <h2>Top Rated Movies</h2>
            <Link to='/movie/discover/top-rate'>
              <OutlineButton className='small'>View more</OutlineButton>
            </Link>
          </div>
          <MovieList type={movieType.top_rate} />
        </div>
        {genreList.length > 0 &&
          genreList.map((genre, index) => (
            <div className='section mb-3' key={index}>
              <div className='section__header mb-2'>
                <h2>{genre.name}</h2>
                <Link to={`/movie/discover/${genre.id}`}>
                  <OutlineButton className='small'>View more</OutlineButton>
                </Link>
              </div>
              <MovieList type={genre.id} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;
