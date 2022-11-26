import React from 'react';

import './footer.scss';

import { Link } from 'react-router-dom';

import bg from '../../assets/footer-bg.jpg';
import logo from '../../assets/tmovie.png';

const Footer = () => {
  return (
    <div className='footer' style={{ backgroundImage: `url(${bg})` }}>
      <div className='footer__content container'>
        <div className='footer__content__logo'>
          <div className='logo'>
            <img src={logo} alt='' />
            <Link to='/home'>hi-Film</Link>
          </div>
        </div>
        <div className='footer__content__menus'>
          <div className='footer__content__menu'>
            <Link to='/home'>Home</Link>
            <Link to='/home'>Contact us</Link>
            <Link to='/home'>Term of services</Link>
            <Link to='/home'>About us</Link>
          </div>
          <div className='footer__content__menu'>
            <Link to='/home'>Live</Link>
            <Link to='/home'>FAQ</Link>
            <Link to='/home'>Premium</Link>
            <Link to='/home'>Pravacy policy</Link>
          </div>
          <div className='footer__content__menu'>
            <Link to='/home'>You must watch</Link>
            <Link to='/home'>Recent release</Link>
            <Link to='/home'>Top IMDB</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
