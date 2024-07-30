import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Text, Layout, useTheme } from "@ui-kitten/components";

const QrScanner = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false); // QR kod okunup okunmadığını takip et
  const theme = useTheme();
  const isDarkMode = theme["background-basic-color-1"] === "#222B45";

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true); // QR kod okundu
    Alert.alert(`QR kod okundu! Tip: ${type}, Veri: ${data}`);
    // Okunan veriyi işleyebilirsiniz
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Layout
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? theme["background-basic-color-1"]
            : "#A5D19E",
        },
      ]}
    >
      <Text
        category="h1"
        style={{ color: isDarkMode ? "#fff" : "#333", marginBottom: 20 }}
      >
        QR Scanner
      </Text>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} // Eğer okunduysa tekrar okuma yapılmasın
        style={styles.scanner}
      />
      {!scanned && (
        <Text style={{ color: isDarkMode ? "#fff" : "#333", marginTop: 20 }}>
          QR kod okunuyor...
        </Text>
      )}
      {scanned && (
        <Text style={{ color: isDarkMode ? "#fff" : "#333", marginTop: 20 }}>
          QR kod okundu!
        </Text>
      )}
    </Layout>
  );
};

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  scanner: {
    height: 200,
    width: 200,
    borderWidth: 2,
    borderColor: "#333",
    borderRadius: 10,
  },
};

export default QrScanner;
