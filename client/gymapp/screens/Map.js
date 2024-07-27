import { StyleSheet, View, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import * as Location from "expo-location";

const { width, height } = Dimensions.get("window");

export default function Map() {
  const [gyms, setGyms] = useState([]);
  const [region, setRegion] = useState(null);

  useEffect(() => {
    // Bursa koordinatları
    const bursaCoordinates = {
      latitude: 40.1826,
      longitude: 29.0665,
    };

    // Harita konumunu Bursa'dan başlat
    setRegion({
      ...bursaCoordinates,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    // Kullanıcının konumunu al
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Konum izni verilmedi.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      fetchGyms(latitude, longitude);
    };

    getLocation();
  }, []);

  const fetchGyms = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=gym&key=YOUR_GOOGLE_MAPS_API_KEY`
      );
      setGyms(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  if (!region) {
    return null;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={setRegion}
      >
        {gyms.map((gym) => (
          <Marker
            key={gym.id}
            coordinate={{
              latitude: gym.geometry.location.lat,
              longitude: gym.geometry.location.lng,
            }}
            title={gym.name}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,
    height: height,
  },
});
