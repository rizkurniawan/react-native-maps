import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
  const [currentLatitude, setCurrentLatitude] = useState(null);
  const [currentLongitude, setCurrentLongitude] = useState(null);

  const screen = Dimensions.get("screen");
  const screenHeight = screen.height * screen.scale;
  const screenWidth = screen.width * screen.scale;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      let location = await Location.getCurrentPositionAsync({});

      setCurrentLatitude(Number(JSON.stringify(location.coords.latitude)));
      setCurrentLongitude(Number(JSON.stringify(location.coords.longitude)));
    })();
  }, [currentLatitude, currentLongitude]);
  
  // console.log(location);
  // console.log(currentLatitude);
  // console.log(currentLongitude);

  return (
    <View style={styles.container}>
      <MapView
        style={{ width: screenWidth, height: screenHeight }}
        showsUserLocation={true}
        minZoomLevel={1}
        maxZoomLevel={20}
        initialRegion={{
          latitude: currentLatitude,
          longitude: currentLongitude,
          latitudeDelta: 0.04,
          longitudeDelta: 0.05,
        }}
      />
      <Text
        style={{
          position: "absolute",
          bottom: 0,
          marginBottom: 15,
          color: "red",
          fontSize: 16,
          fontWeight: "bold",
          textAlign: "center"
        }}
      >
        Rizky Kurniawan (41519010149)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
