import axios from 'axios';
const per_page = 15;

const API_KEY = 'mfAraYJteuSJvHQfElreOSXr2HIbdwC1GFrE6A9Q3FL8OEl9EvmWmnTq';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: per_page,
};

export const getImages = async (query, page) => {
  const response = await axios.get(`search?query=${query}&page=${page}`);
  const availablePages = Math.ceil(response.data.total_results / per_page);

  return { images: response.data.photos, totalPages: availablePages };
};

export const handleFetchData = images => {
  return images.map(({ id, avg_color, alt, src }) => {
    return { id, avg_color, alt, src: src.large };
  });
};
