import axios from 'axios';

const REACT_APP_API_KEY = `33689458-96d026a39bbfa66b5f5b55deb`;
const BASE_URL = (axios.defaults.baseURL = 'https://pixabay.com/api/');

export const fetchData = async (query, page, perPage) => {
  const response = await axios.get(`${BASE_URL}/`, {
    params: {
      key: `${REACT_APP_API_KEY}`,
      image_type: 'photo',
      orientation: 'horizontal',
      q: query,
      page: page,
      per_page: perPage,
    },
  });
  return response.data;
};
