import React from 'react';
import SuperHero from './SuperHero';
import './SuperHeroList.scss';
import withInfiniteScroll, {
  infiniteScrollCondition,
} from '../../HOC/withInfiniteScroll';
import withLoading, { loadingCondition } from '../../HOC/withLoading';

const SuperHeroList = (props) => {
  return (
    <div className='superHeroList'>
      {props.list.map.length ? (
        props.list.map((h) => (
          <SuperHero
            key={h.id}
            index={h.id}
            superHero={h}
            getSuperHeroDetails={props.getSuperHeroDetails}
          />
        ))
      ) : (
        <div>No SuperHero found!</div>
      )}
    </div>
  );
};

export default withInfiniteScroll(infiniteScrollCondition)(
  withLoading(loadingCondition)(SuperHeroList)
);
