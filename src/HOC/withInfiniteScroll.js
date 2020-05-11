import React, { useEffect, useCallback } from 'react';
import _ from 'lodash';
export const infiniteScrollCondition = (props) =>
  window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
  props.list.length &&
  !props.loading;
//&&  !props.isError;

const withInfiniteScroll = (conditionFn) => (Component) => (props) => {
  const onScroll = () => {
    conditionFn(props) && props.onScrollFetch();
  };

  const throttledScrollCallback = useCallback(_.throttle(onScroll, 300));
  useEffect(() => {
    window.addEventListener('scroll', throttledScrollCallback, false);
    return () =>
      window.removeEventListener('scroll', throttledScrollCallback, false);
  });

  return <Component {...props} />;
};

export default withInfiniteScroll;
