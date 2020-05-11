import React, { useState, useEffect } from 'react';
import { getDetailsUrl, checkStatus, parseJSON } from '../../fetchUtility';
import { Link } from 'react-router-dom';
import SuperHeroDetail from '../../component/SuperHeroDetail/SuperHeroDetail';

const SuperHeroDetailManager = (props) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = props.match.params.id;
    if (!id) {
      this.props.history.push('/');
    }
  });

  useEffect(() => {
    const id = props.match.params.id;
    fetch(getDetailsUrl(id))
      .then(checkStatus)
      .then(parseJSON)
      .then((response) => processDeatilsResponse(response))
      .catch((error) => {
        console.log('There was a problem!', error);
      });
  }, [props.match.params.id]);

  const processDeatilsResponse = (response) => {
    setLoading(false);
    setDetails(response);
  };

  return (
    <>
      {!loading && (
        <div className='App-link'>
          <Link to='/'>Go Back</Link>
        </div>
      )}
      <SuperHeroDetail loading={loading} details={details} />
    </>
  );
};

export default SuperHeroDetailManager;
