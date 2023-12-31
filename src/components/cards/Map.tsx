import {
  Autocomplete,
  GoogleMap,
  GoogleMapProps,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';
import { Input } from 'antd';
import { useRef, useState } from 'react';

type MapProps = GoogleMapProps & {
  defaultSelectedPlace?: string;
  defaultCurrentLocation?: google.maps.LatLngLiteral;
  hideSearch?: boolean;
  onChangedLatLng?: (value: google.maps.LatLngLiteral) => void;
  onSelectedPlace?: (name: string, address: string) => void;
};

export default function Map(props: MapProps) {
  const {
    defaultSelectedPlace,
    defaultCurrentLocation,
    hideSearch = false,
    onChangedLatLng,
    onSelectedPlace,
    mapContainerStyle,
  } = props;

  const [selectedPlace, setSelectedPlace] = useState<string>(
    defaultSelectedPlace || '',
  );
  const [currentLocation, setCurrentLocation] =
    useState<google.maps.LatLngLiteral>(
      defaultCurrentLocation || {
        lat: -6.2297401,
        lng: 106.7471174,
      },
    );
  const autocompleteRef = useRef<google.maps.places.Autocomplete>();

  // load script for google map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API as string,
    libraries: ['places'],
  });

  if (!isLoaded) return <div>Loading....</div>;

  // handle place change on search
  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place) {
        setSelectedPlace(String(place.name));
        setCurrentLocation({
          lat: place.geometry?.location?.lat() || 0,
          lng: place.geometry?.location?.lng() || 0,
        });

        if (onChangedLatLng) {
          onChangedLatLng({
            lat: place.geometry?.location?.lat() || 0,
            lng: place.geometry?.location?.lng() || 0,
          });
        }

        if (onSelectedPlace) {
          onSelectedPlace(
            place.name || '',
            place.address_components
              ?.map((item: { long_name: string }) => item.long_name)
              .join(' ') || '',
          );
        }
        console.log('place ', place);
      }
    }
  };

  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      {!hideSearch ? (
        <Autocomplete
          onLoad={(autocomplete) => {
            console.log('Autocomplete loaded:', autocomplete);
            autocompleteRef.current = autocomplete;
          }}
          onPlaceChanged={handlePlaceChanged}
          options={{ fields: ['address_components', 'geometry', 'name'] }}
        >
          <Input
            placeholder="Search for a location..."
            style={{
              position: 'absolute',
              zIndex: 1,
              width: '40%',
              margin: '.5rem 0 0 .5rem',
            }}
          />
        </Autocomplete>
      ) : null}

      <GoogleMap
        zoom={selectedPlace ? 16 : 10}
        center={currentLocation}
        mapContainerClassName="map"
        mapContainerStyle={{
          width: '100%',
          height: '300px',
          margin: 'auto',
          ...mapContainerStyle,
        }}
        options={{
          disableDefaultUI: true,
        }}
      >
        {selectedPlace && <Marker position={currentLocation} />}
      </GoogleMap>
    </div>
  );
}
