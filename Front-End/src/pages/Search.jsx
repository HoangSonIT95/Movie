import React, { useState, useEffect, useCallback } from 'react';
import './Search.scss';

import MovieCard from '../components/movie-card/MovieCard';
import PageHeader from '../components/page-header/PageHeader';
import { OutlineButton } from '../components/button/Button';

import tmdbApi from '../api/tmdbApi';

const MovieSearch = props => {
  const token = JSON.parse(localStorage.getItem('token'));
  if (!token) {
    window.location.href = '/';
  }

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [items, setItems] = useState([]);
  const [genre, setGenre] = useState([]);
  const [query, setQuery] = useState({
    name: '',
    year: '',
    discover: '',
    media: '',
    language: '',
  });

  useEffect(() => {
    const getGenreList = async () => {
      let response = null;
      response = await tmdbApi.getGenreList();
      if (response !== null) {
        setGenre(response);
      }
    };
    getGenreList();
  }, []);

  const goToSearch = e => {
    e.preventDefault();
    const name = e.target.keyword.value;
    const year = e.target.year.value;
    const discover = e.target.discover.value;
    const media = e.target.mediaType.value;
    const language = e.target.language.value;
    setQuery({
      name,
      year,
      discover,
      media,
      language,
    });
    const getList = async () => {
      let response = null;
      response = await tmdbApi.search(query, page);
      if (response !== null) {
        setItems(response.results);
        setTotalPage(response.total_pages);
      } else {
        setItems(response);
      }
    };
    getList();
  };

  const loadMore = async () => {
    const params = {
      page: page + 1,
    };
    let response = await tmdbApi.search(query, params.page);
    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  return (
    <>
      <PageHeader type='search' />
      <div className='search'>
        <form type='submit' onSubmit={goToSearch}>
          <div className='form'>
            <div className='form--item name'>
              <h3>Movie Name</h3>
              <input
                type='text'
                placeholder='Enter keyword'
                name='keyword'
                id='keyword'
              />
            </div>
            <div className='form--item year'>
              <h3>Release year</h3>
              <input type='year' min='1900' max='2099' name='year' id='year' />
            </div>
            <div className='form--item select'>
              <h3>Discover</h3>
              <select name='discover' id='discover'>
                <option value=''>All Discover</option>
                {genre.map((item, i) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className='form--item select'>
              <h3>Media Type</h3>
              <select name='mediaType' id='mediaType'>
                <option value=''>All Type</option>
                <option value='movie'>Movie</option>
                <option value='tv'>Tv</option>
                <option value='person'>Person</option>
              </select>
            </div>
            <div className='form--item select'>
              <h3>Language</h3>
              <select name='language' id='language'>
                <option value=''>All Language</option>
                <option value='en'>England - US</option>
                <option value='ja'>Japan</option>
                <option value='ko'>Korea</option>
              </select>
            </div>
          </div>
          <div className='btn_search'>
            <button type='submit' className='btn small'>
              Search
            </button>
          </div>
        </form>
      </div>
      {items !== null ? (
        <div className='container'>
          <div className='section mb-3'>
            <div className='movie-grid'>
              {items.map((item, i) => (
                <MovieCard item={item} key={i} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className='container'>
          <div className='section mb-3'>
            <h1 className='result_search'>Not Found Movie!</h1>
          </div>
        </div>
      )}

      {items !== null && page < totalPage ? (
        <div className='movie-grid__loadmore'>
          <OutlineButton className='small' onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};

export default MovieSearch;
