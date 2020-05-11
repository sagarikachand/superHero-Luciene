import React from 'react';

import withLoading, { loadingCondition } from '../../HOC/withLoading';
import Collapsible from '../UI/Collapsible';
import './SuperHeroDetail.scss';
const SuperHeroDetail = ({ loading, details }) => {
  const renderDetails = () => {
    return (
      <div className='detail_wrapper'>
        <p className='name'>{details.name}</p>
        {Object.keys(details)
          .filter(
            (key) =>
              key !== 'name' &&
              key !== 'id' &&
              key !== 'response' &&
              key !== 'image'
          )
          .map((detailsKey) => {
            return (
              <div className='attributes' key={detailsKey}>
                <Collapsible title={detailsKey}>
                  {Object.keys(details[detailsKey]).map((atKey) => {
                    const attr = details[detailsKey];
                    return (
                      <p key={atKey}>
                        {atKey} :{' '}
                        {Array.isArray(attr[atKey])
                          ? attr[atKey][0]
                          : attr[atKey]}{' '}
                      </p>
                    );
                  })}
                </Collapsible>
              </div>
            );
          })}
      </div>
    );
  };
  return <div>{details && renderDetails()}</div>;
};

export default withLoading(loadingCondition)(SuperHeroDetail);
