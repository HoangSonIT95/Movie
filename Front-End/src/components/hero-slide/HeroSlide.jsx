import React, { useState, useEffect, useRef, createElement } from 'react';
import axios from 'axios';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import Button, { OutlineButton } from '../button/Button';
import Modal, { ModalContent } from '../modal/Modal';

import tmdbApi, { category, movieType } from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig';

import './hero-slide.scss';
import { useHistory } from 'react-router';

const HeroSlide = () => {
  SwiperCore.use([Autoplay]);

  const [movieItem, setMovieItem] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMoviesList(
          movieType.trending,
          params.page
        );
        //const response = await tmdbApi.getMoviesList(movieType.popular, {params});
        setMovieItem(
          response.results[
            Math.floor(Math.random() * response.results.length - 1)
          ]
        );
      } catch {
        console.log('error');
      }
    };
    getMovies();
  }, []);

  return (
    <div className='hero-slide'>
      <Swiper
        modules={[Autoplay]}
        grabCursor={true}
        spaceBetween={0}
        slidesPerView={1}
        // autoplay={{delay: 3000}}
      >
        <SwiperSlide>
          {({ isActive }) => (
            <HeroSlideItem
              item={movieItem}
              className={`${isActive ? 'active' : ''}`}
            />
          )}
        </SwiperSlide>
      </Swiper>

      <TrailerModal item={movieItem} />
    </div>
  );
};

const HeroSlideItem = props => {
  let hisrory = useHistory();

  const item = props.item;

  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );

  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);

    const video = await tmdbApi.getVideos(item.id);

    if (video !== null) {
      const videSrc = 'https://www.youtube.com/embed/' + video.key;
      modal
        .querySelector('.modal__content > iframe')
        .setAttribute('src', videSrc);
    } else {
      modal.querySelector('.modal__content').innerHTML = `<h1>No Trailer</h1>`;
      window.addEventListener('click', () => {
        modal.classList.remove('active');
      });
    }

    modal.classList.toggle('active');
  };

  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className='hero-slide__item__content container'>
        <div className='hero-slide__item__content__info'>
          <h2 className='title'>{item.title || item.name}</h2>
          <div className='overview'>{item.overview}</div>
          <div className='btns'>
            <Button onClick={() => hisrory.push('/movie/id/' + item.id)}>
              Watch now
            </Button>
            <OutlineButton onClick={setModalActive}>
              Watch trailer
            </OutlineButton>
          </div>
        </div>
        <div className='hero-slide__item__content__poster'>
          <img src={apiConfig.w500Image(item.poster_path)} alt='' />
        </div>
      </div>
    </div>
  );
};

const TrailerModal = props => {
  const item = props.item;

  const iframeRef = useRef(null);

  const onClose = () => iframeRef.current.setAttribute('src', '');

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModalContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width='100%'
          height='500px'
          title='trailer'
        ></iframe>
      </ModalContent>
    </Modal>
  );
};

export default HeroSlide;
