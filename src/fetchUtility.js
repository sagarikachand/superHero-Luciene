export const baseURL = 'https://superheroapi.com/api.php/3325880540769725';

export const getFetchUrl = (id) => `${baseURL}/${id}/image`;

export const getSearchUrl = (query) => `${baseURL}/search/${query}`;

export const getDetailsUrl = (id) => `${baseURL}/${id}`;
export const checkStatus = (response) => {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.error));
  }
};

export const parseJSON = (response) => response.json();
