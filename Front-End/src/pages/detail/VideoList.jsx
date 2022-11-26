import React, { useState, useEffect, useRef } from 'react';

import { useParams } from 'react-router';

import tmdbApi from '../../api/tmdbApi';

const VideoList = props => {
  const { category } = useParams();

  const [video, setVideo] = useState();

  useEffect(() => {
    const getVideos = async () => {
      const res = await tmdbApi.getVideos(props.id);
      if (res !== null) {
        setVideo(res);
      }
    };
    getVideos();
  }, [category, props.id]);

  if (video) {
    return (
      <>
        <Video item={video} />
      </>
    );
  } else {
    return <h1 className='not_found_video'>Not Found Video!</h1>;
  }
};

const Video = props => {
  const item = props.item;

  const iframeRef = useRef(null);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + 'px';
    iframeRef.current.setAttribute('height', height);
  }, []);

  return (
    <div className='video'>
      <div className='video__title'>
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width='100%'
        title='video'
      ></iframe>
    </div>
  );
};

export default VideoList;
