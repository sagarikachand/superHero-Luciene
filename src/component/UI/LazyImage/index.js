import React, { useState, useEffect } from 'react';
import './LazyImage.scss';
import { ImagePlaceHolder } from '../../../constants';

export const LazyImage = ({ src, alt }) => {
  const [imageSrc, setImageSrc] = useState(ImagePlaceHolder);
  const [imageRefNew, setImageRef] = useState();

  const onLoad = (event) => {
    event.target.classList.add('loaded');
  };

  const onError = (event) => {
    event.target.classList.add('has-error');
  };

  useEffect(() => {
    let observer;
    let didCancel = false;

    if (imageRefNew && imageSrc !== src) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setImageSrc(src);
                observer.unobserve(imageRefNew);
              }
            });
          },
          {
            root: null,
            threshold: 0.01,
            rootMargin: '10px',
          }
        );
        observer.observe(imageRefNew);
      } else {
        // Old browsers fallback

        setImageSrc(src);
      }
    }
    return () => {
      didCancel = true;
      // on component cleanup, we remove the listner
      if (observer && observer.unobserve) {
        observer.unobserve(imageRefNew);
      }
    };
  }, [src, imageSrc, imageRefNew]);
  return (
    <img
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

export default LazyImage;
