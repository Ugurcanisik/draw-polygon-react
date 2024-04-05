import { useEffect, useMemo, useState } from 'react';
import { fetchPlaces } from '@/services/place';
import { errorNotification } from '@/helpers/notification';

const usePlaceList = () => {
  const [places, setPlaces] = useState([]);
  const [fetching, setFetching] = useState(true);

  const fetchAllPlace = async () => {
    try {
      setFetching(true);
      const response = await fetchPlaces();
      setPlaces(response.data.data);
    } catch (err) {
      errorNotification({ message: 'Unexpected Error' });
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchAllPlace();
  }, []);

  return {
    places,
    fetching,
    formattedPlacesForSelect: useMemo(() => {
      return [{
        value: 'allPlaces', label: 'All Places' },
      ...places.map((item) => ({ value: item.placeNumber, label: item.name }))]
    }, [places])
  };
};

export default usePlaceList;
