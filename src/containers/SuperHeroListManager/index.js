import React, { useEffect, useReducer, useCallback } from 'react';
import _ from 'lodash';

import SuperHeroList from '../../component/SuperHeroList/SuperHeroList';
import { RECORDS_PER_PAGE as RPP, ID_ARRAY as idArray } from '../../constants';
import {
  getFetchUrl,
  getSearchUrl,
  checkStatus,
  parseJSON,
} from '../../fetchUtility';

const initialState = {
  page: 0,
  superHeroList: [],
  loading: true,
  searchResult: [],
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'fetchStart':
      return { ...state, loading: true, error: null };
    case 'fetchStartAndClear':
      return { ...state, loading: true, error: null, superHeroList: [] };
    case 'setList':
      return {
        ...state,
        superHeroList: action.payload,
        loading: false,
        error: null,
        page: 0,
      };

    case 'updateList':
      return {
        ...state,
        superHeroList: [...state.superHeroList, ...action.payload],
        loading: false,
        error: null,
        page: state.page + 1,
      };
    case 'setSearchResult':
      return {
        ...state,
        searchResult: action.payload,
        loading: false,
        error: null,
      };

    case 'setError':
      return {
        ...state,
        error: action.payload,
        loading: false,
        superHeroList: [],
      };

    default:
      return new Error('no actiontype');
  }
};
const SuperHeroListManager = ({ searchText, ...rest }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchOnSearch = (query) => {
    dispatch({ type: 'fetchStartAndClear' });
    fetch(getSearchUrl(query))
      .then(checkStatus)
      .then(parseJSON)
      .then((response) => processSearchResponse(response, 0))
      .catch((error) => {
        console.log('There was a problem!', error);
      });
  };
  const debouncedSearch = useCallback(_.debounce(fetchOnSearch, 500), []);

  useEffect(() => {
    if (searchText !== '') debouncedSearch(searchText);
    else fetchInitialList(0);
  }, [searchText]);

  const fetchSuperHeroList = (page) => {
    dispatch({ type: 'fetchStart' });
    const currentIds = _.slice(idArray, page * RPP, page * RPP + RPP);

    Promise.all(
      currentIds.map((id) =>
        fetch(getFetchUrl(id))
          .then(checkStatus)
          .then(parseJSON)
          .catch((error) => console.log('There was a problem!', error))
      )
    ).then((data) => {
      if (data.length) {
        processResponse(
          data.filter((d) => d.response === 'success'),
          page
        );
      }
    });
  };

  const processResponse = (response, page) => {
    if (page === 0) dispatch({ type: 'setList', payload: response });
    else dispatch({ type: 'updateList', payload: response });
  };

  const processSearchResponse = (response, page) => {
    if (response && response.error) {
      return dispatch({ type: 'setError', payload: response.error });
    }
    if (!response) response = state.searchResult;
    const currentList = _.slice(response.results, page * RPP, page * RPP + RPP);
    dispatch({ type: 'setSearchResult', payload: response });
    if (page === 0) {
      dispatch({ type: 'setList', payload: currentList });
    } else {
      dispatch({ type: 'updateList', payload: currentList });
    }
  };

  const fetchInitialList = () => {
    fetchSuperHeroList(0);
  };

  const fetchListOnScroll = () => {
    if (searchText === '') {
      fetchSuperHeroList(state.page + 1);
    } else {
      processSearchResponse(null, state.page + 1);
    }
  };

  const getSuperHeroDetails = (id) => {
    rest.history.push(`/details/${id}`);
  };

  return (
    <div>
      {searchText !== '' && (
        <div className='searchTerm'>
          {state.loading ? 'Loading' : 'Diplaying'} results for '{searchText}'
        </div>
      )}

      {state.error ? (
        <p>{state.error}</p>
      ) : (
        <SuperHeroList
          list={state.superHeroList}
          loading={state.loading}
          onScrollFetch={fetchListOnScroll}
          getSuperHeroDetails={getSuperHeroDetails}
        />
      )}
    </div>
  );
};

export default SuperHeroListManager;
