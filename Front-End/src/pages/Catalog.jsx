import React from 'react';

import { useParams } from 'react-router';

import PageHeader from '../components/page-header/PageHeader';

import MovieGrid from '../components/movie-grid/MovieGrid';

const Catalog = () => {
  const { type } = useParams();
  return (
    <>
      <PageHeader type={type} />
      <div className='container'>
        <div className='section mb-3'>
          <MovieGrid type={type} />
        </div>
      </div>
    </>
  );
};

export default Catalog;
