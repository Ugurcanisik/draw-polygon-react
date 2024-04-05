import { TileLayer, FeatureGroup, MapContainer, Marker, Popup, Polygon, useMap } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import { useEffect, useRef, useState } from 'react';
import './index.css'
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import { Helmet } from 'react-helmet';
import { Button, Select } from '@mantine/core'
import usePlace from '@/hooks/usePlace';
import { createOrUpdatePolygon } from '@/services/placeZone'
import { errorNotification, successNotification, warningNotification } from '@/helpers/notification';
import L from 'leaflet';
import iconMarker from 'leaflet/dist/images/marker-icon.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import usePlaceList from '@/hooks/usePlaceList';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow
});

function FlyToPolygon({ coordinates, zoomLevel }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo(coordinates, zoomLevel)
  }, [coordinates]);
}

function AllPlaceZoom() {
  const map = useMap()
  map.flyTo([38.9768473, 29.8453241], 6)
}

function PolygonDrawer() {
  const mapRef = useRef();
  const fgRef = useRef();
  const [placeNumber, setPlaceNumber] = useState(null)
  const [currentPolygons, setCurrentPolygons] = useState([])
  const [loading, setLoading] = useState(false)
  const selectedPlaceRef = useRef({ placeNumber: null, name: null })
  const [editOptions, setEditOptions] = useState({
    draw: {
      rectangle: false,
      polyline: false,
      circle: false,
      circlemarker: false,
      marker: false,
      polygon: false
    },
    edit: {
      remove: false,
      edit: false
    }
  });

  const { formattedPlacesForSelect } = usePlaceList();
  const { place, fetching } = usePlace(placeNumber)

  const zoomLevel = 14;

  useEffect(() => {
    if (!place) { return }

    if (Array.isArray(place)) {
      setEditOptions({
        draw: {
          rectangle: false,
          polyline: false,
          circle: false,
          circlemarker: false,
          marker: false,
          polygon: false
        },
        edit: {
          remove: false,
          edit: false
        }
      })

    } else {
      setEditOptions({
        draw: {
          rectangle: false,
          polyline: false,
          circle: false,
          circlemarker: false,
          marker: false
        },
        edit: {}
      })
      setCurrentPolygons(place.zones)
    }
  }, [place]);

  useEffect(() => {
    if (!formattedPlacesForSelect) { return; }
    setPlaceNumber(formattedPlacesForSelect[0].value)
    selectedPlaceRef.current = {
      placeNumber: formattedPlacesForSelect[0].value,
      name: formattedPlacesForSelect[0].label
    }
  }, []);

  const onCreate = (e) => {
    const { layer } = e;
    const { _leaflet_id } = layer;

    setCurrentPolygons((polygon) => [...polygon, {
      id: _leaflet_id,
      zoneNumber: null,
      coordinates: [layer.toGeoJSON().geometry.coordinates[0].map(i => i.reverse())]
    }]);
  };

  const onEdited = (e) => {
    const {
      layers: { _layers }
    } = e;

    Object.values(_layers).map(({ _leaflet_id, editing, options: { zoneNumber } }) => {
      if (zoneNumber) {
        setCurrentPolygons((polygon) => polygon.map(poly => {
          if (poly.zoneNumber === zoneNumber) {
            return {
              ...poly,
              coordinates: [editing._poly.toGeoJSON().geometry.coordinates[0].map(i => i.reverse())]
            }
          }
          return poly
        }));
      } else {
        setCurrentPolygons((polygon) => polygon.map(poly => {
          if (poly.id === _leaflet_id) {
            return {
              ...poly,
              coordinates: [editing._poly.toGeoJSON().geometry.coordinates[0].map(i => i.reverse())]
            }
          }
          return poly
        }));
      }
    });
  };

  const onDeleted = (e) => {
    const {
      layers: { _layers }
    } = e;
    Object.values(_layers).map(({ _leaflet_id, options: { zoneNumber } }) => {
      if (zoneNumber) {
        setCurrentPolygons((layers) => layers.filter((l) => l.zoneNumber !== zoneNumber));
      } else {
        setCurrentPolygons((layers) => layers.filter((l) => l.id !== _leaflet_id));
      }
    });
  };

  const clearMap = () => Object.values(fgRef.current._layers).forEach(layer => layer.remove())

  const save = async () => {
    if (currentPolygons.length < place.zones.length) {
      warningNotification({
        message: 'You can not delete current polygon' })
      return;
    }

    try {
      setLoading(true)
      const prepareData = {
        placeNumber: selectedPlaceRef.current.placeNumber,
        name: selectedPlaceRef.current.name,
        zones: currentPolygons.map(poly => ({
          polygon: {
            type: 'Polygon',
            coordinates: poly.coordinates
          },
          zoneNumber: poly.zoneNumber
        }))
      }
      const response = await createOrUpdatePolygon(prepareData)
      setCurrentPolygons(response.data.data)
      successNotification({})
    } catch (err) {
      errorNotification({})
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Polygon</title>
      </Helmet>
      <div style={
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          marginBottom: 15
        }
      }>
        <Select
          value={placeNumber}
          style={
            {
              width: '300px'
            }
          }
          placeholder='Select Place!'
          searchable
          data={formattedPlacesForSelect}
          onChange={
            (value) => {
              clearMap()
              selectedPlaceRef.current = {
                placeNumber: value,
                name: formattedPlacesForSelect.find(i => i.value === value).label
              }
              setPlaceNumber(value)
            }
          }
        />

        <Button
          loading={loading || fetching}
          disabled={place?.length > 0 || currentPolygons.length === 0}
          style={
            {
              width: '140px'
            }
          }
          onClick={save}>
            Save
        </Button>

      </div>
      <MapContainer
        center={[41.015137, 28.979530]} zoom={zoomLevel} ref={mapRef} style={
          {
            zIndex: 0
          }
        }>
        <FeatureGroup ref={fgRef}>
          <EditControl
            position='bottomright'
            onCreated={onCreate}
            onEdited={onEdited}
            onDeleted={onDeleted}
            draw={editOptions.draw}
            edit={editOptions.edit}
          />
          {
            place
              ? (Array.isArray(place)
                ? (place.map(i => {
                  return i.zones.map(zone => (
                    <Polygon
                      key={zone.zoneNumber}
                      zoneNumber={zone.zoneNumber}
                      positions={zone.coordinates}
                    >
                      <Popup>
                        {i.name}
                      </Popup>
                    </Polygon>
                  ))
                }))
                : (
                  place.zones.map((zone) => (
                    <Polygon
                      key={zone.zoneNumber}
                      zoneNumber={zone.zoneNumber}
                      positions={zone.coordinates}
                    >
                      <Popup>
                        {zone.zoneNumber}
                      </Popup>
                    </Polygon>))
                ))
              : null
          }
          {
            Array.isArray(place) && (
              <AllPlaceZoom />
            )
          }
        </FeatureGroup>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {/* Start not Editable Places Map */}
        {
          place && place.notEditablePlaces
            ? (
              place.notEditablePlaces.map((place) => (
                <>
                  <Marker
                    key={Math.random()}
                    position={place.coordinates}
                  >
                    <Popup>
                      {place.name}
                    </Popup>
                  </Marker>
                  {
                    place.zones.map(zone => (
                      <Polygon
                        key={Math.random()}
                        positions={zone.coordinates}
                        color='red'
                      >
                        <Popup>
                          {place.name}
                        </Popup>
                      </Polygon>
                    ))
                  }
                </>
              ))
            )
            : null
        }
        {/* End not Editable Places Map */}
        {/* Start Place Mark */}
        {
          place
            ? (
              Array.isArray(place)
                ? (place.map(i => (
                  <Marker
                    position={i.coordinates}
                    key={i.placeNumber}
                    eventHandlers={
                      {
                        dblclick: (e) => {
                          clearMap()
                          selectedPlaceRef.current = {
                            placeNumber: i.placeNumber,
                            name: formattedPlacesForSelect.find(place => place.value === i.placeNumber).label
                          }
                          setPlaceNumber(i.placeNumber)
                        }
                      }
                    }>
                    <Popup>
                      {i.name}
                    </Popup>
                  </Marker>
                )))
                : (
                  <>
                    <Marker
                      position={place.coordinates}
                      eventHandlers={
                        {
                          dblclick: (e) => {
                            clearMap()
                            setPlaceNumber('allPlaces')
                          }
                        }
                      }>
                      <Popup>
                        {place.name}
                      </Popup>
                    </Marker>
                    <FlyToPolygon coordinates={place.coordinates} zoomLevel={zoomLevel} />
                  </>
                )
            )
            : null
        }
        {/* End Place Mark */}
      </MapContainer>
    </>
  )
}

export default PolygonDrawer
