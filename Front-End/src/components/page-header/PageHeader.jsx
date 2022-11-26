import React, { useState, useEffect } from 'react';
import tmdbApi from '../../api/tmdbApi';
import { useParams } from 'react-router';
import './page-header.scss';

import bg from '../../assets/footer-bg.jpg';

const PageHeader = props => {
  const [title, setTitle] = useState('');
  const type = props.type;

  useEffect(() => {
    const getGenreList = async () => {
      const res = await tmdbApi.getGenreList();
      switch (type) {
        case 'trending':
          setTitle('Trending');
          break;
        case 'search':
          setTitle('search');
          break;
        case 'login':
          setTitle('login');
          break;
        case 'top-rate':
          setTitle('Top Rate');
          break;
        default: {
          const genreName = res.find(genre => genre.id === Number(type)).name;
          setTitle(genreName);
        }
      }
    };
    getGenreList();
  }, [type]);

  if (title === 'search') {
    return (
      <div className='page-header' style={{ backgroundImage: `url(${bg})` }}>
        <h2>Search Movie</h2>
      </div>
    );
  } else if (title === 'login') {
    return (
      <div className='page-header' style={{ backgroundImage: `url(${bg})` }}>
        <h2>Login to watch movie and search movie</h2>
      </div>
    );
  }
  return (
    <div className='page-header' style={{ backgroundImage: `url(${bg})` }}>
      <h2>List Of {title} Movies</h2>
    </div>
  );
};

export default PageHeader;
