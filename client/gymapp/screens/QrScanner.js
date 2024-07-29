import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

const QrScanner = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      console.log("Camera permission status:", status); // Debugging log
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    Alert.alert(`Scanned ${type}`, data); // Display QR code data
    navigation.goBack(); // Navigate back to the previous screen or do any other action
  };

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <Text style={styles.instructions}>Scan a QR code</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  instructions: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: -50 }],
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
  },
});

export default QrScanner;
