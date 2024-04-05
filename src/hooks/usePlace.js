import { useEffect, useState } from 'react';
import { fetchPlaceDetail } from '@/services/place';
import { errorNotification, warningNotification } from '@/helpers/notification';

const usePlace = (placeNumber) => {
  const [place, setPlace] = useState(null);
  const [fetching, setFetching] = useState(true);

  const fetchPlace = async () => {
    if (!placeNumber) { return; }

    try {
      setFetching(true);
      const response = await fetchPlaceDetail(placeNumber);
      setPlace(response.data.data);
    } catch (err) {
      if (err?.response?.status === 404) {
        warningNotification({ message: 'Polygon is not found' });
        return;
      }
      errorNotification({ message: 'Unexpected Error' });
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchPlace(placeNumber);
  }, [placeNumber]);

  return {
    place,
    fetching
  };
};

export default usePlace;
