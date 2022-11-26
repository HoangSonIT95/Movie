import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './movie-list.scss';

import { SwiperSlide, Swiper } from 'swiper/react';
import { Link } from 'react-router-dom';

import Button from '../button/Button';

import tmdbApi, { category } from '../../api/tmdbApi';

import MovieCard from '../movie-card/MovieCard';

const MovieList = props => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getList = async () => {
      let response = await tmdbApi.getMoviesList(props.type, page);

      setItems(response.results);
    };
    getList();
  }, [props.type]);

  return (
    <div className='movie-list'>
      <Swiper grabCursor={true} spaceBetween={10} slidesPerView={'auto'}>
        {items.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MovieList;
