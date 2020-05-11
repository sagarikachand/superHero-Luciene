import React from 'react';
import './SuperHero.scss';
import LazyImage from '../UI/LazyImage';
const SuperHero = ({ superHero, getSuperHeroDetails, index = 1 }) => {
  return (
    <div
      className='superHero'
      onClick={() => {
        getSuperHeroDetails(superHero.id);
      }}
    >
      <div className='imageHolder'>
        {/* <img src={props.superHero.url || props.superHero.image.url} /> */}
        <LazyImage
          src={superHero.url || superHero.image.url}
          // src={`https://picsum.photos/100/100/?image=${index}`}
          alt={superHero.name}
        />
      </div>

      <p>{superHero.name}</p>
    </div>
  );
};

export default SuperHero;
