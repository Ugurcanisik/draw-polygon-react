import ServerAxios from '@/helpers/ServerAxios';

const createOrUpdatePolygon = (body) => ServerAxios.post('/v1/place-zones', body);

export {
  createOrUpdatePolygon
};


