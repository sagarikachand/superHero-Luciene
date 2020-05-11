import React from 'react';
import Loader from '../component/UI/Loader';

export const loadingCondition = (props) => props.loading;

const withLoading = (conditionFn) => (Component) => (props) => {
  return (
    <>
      <Component {...props} />
      {conditionFn(props) && <Loader color={'#008081'} />}
    </>
  );
};

export default withLoading;
