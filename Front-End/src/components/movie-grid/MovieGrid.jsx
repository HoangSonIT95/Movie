import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router';

import './movie-grid.scss';

import MovieCard from '../movie-card/MovieCard';
import Button, { OutlineButton } from '../button/Button';
import Input from '../input/Input';

import tmdbApi, { category, movieType, tvType } from '../../api/tmdbApi';

const MovieGrid = props => {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const getList = async () => {
      let response = await tmdbApi.getMoviesList(props.type, page);
      setItems(response.results);
      setTotalPage(response.total_page);
    };
    getList();
  }, [props.type]);

  const loadMore = async () => {
    const params = {
      page: page + 1,
    };

    let response = await tmdbApi.getMoviesList(props.type, params.page);

    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  return (
    <>
      <div className='movie-grid'>
        {items.map((item, i) => (
          <MovieCard category={props.category} item={item} key={i} />
        ))}
      </div>
      {page < totalPage ? (
        <div className='movie-grid__loadmore'>
          <OutlineButton className='small' onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};

export default MovieGrid;
