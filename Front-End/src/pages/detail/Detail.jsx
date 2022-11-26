import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './detail.scss';
import VideoList from './VideoList';

const Detail = () => {
  const { id } = useParams();

  const [item, setItem] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(id);
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [id]);

  return (
    <>
      {item && (
        <>
          <div
            className='banner'
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>
          <div className='mb-3 movie-content container'>
            <div className='movie-content__poster'>
              <div
                className='movie-content__poster__img'
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.poster_path || item.backdrop_path
                  )})`,
                }}
              ></div>
            </div>
            <div className='movie-content__info'>
              <h1 className='title'>{item.title || item.name}</h1>
              <h3 className='overview'>{item.overview}</h3>
              <h3 className='overview'>
                Release Date:{' '}
                {item.release_date ? item.release_date : item.first_air_date}
              </h3>
              <h3 className='overview'>Popularity: {item.popularity}</h3>
              <h3 className='overview'>Vote Average: {item.vote_average}</h3>
            </div>
          </div>
          <div className='container'>
            <div className='section mb-3'>
              <VideoList id={item.id} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
