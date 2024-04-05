import ServerAxios from '@/helpers/ServerAxios';

const fetchPlaces = () => ServerAxios.get('/v1/places');

const fetchPlaceDetail = (placeNumber) => ServerAxios.get(`/v1/places/${placeNumber}`);

const createPlace = (place) => ServerAxios.post('/v1/places', place);

export {
  fetchPlaces,
  fetchPlaceDetail,
  createPlace
};


