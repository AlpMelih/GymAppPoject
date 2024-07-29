import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../utils/api";
import { Avatar, Icon, Text } from "@ui-kitten/components";
import { TouchableOpacity } from "react-native-gesture-handler";

const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        navigation.navigate("Login");
        return;
      }

      try {
        const res = await api.get("/auth/user", {
          headers: { "x-auth-token": token },
        });
        setName(res.data.name);
      } catch (err) {
        console.error(err);
        navigation.navigate("Login");
      }
    };

    getUser();
  }, [navigation]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar
          style={styles.avatar}
          shape="rounded"
          source={require("../assets/ALP.jpeg")}
        />
      </View>
      <View style={{ flex: 3 }}>
        <View style={{ flex: 1, margin: 30, alignItems: "center" }}>
          <View style={styles.ButtonContainer}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon
                style={styles.leftIcon}
                name="edit-outline"
                fill="#000"
              ></Icon>
            </View>
            <View style={{ flex: 3, justifyContent: "center" }}>
              <Text category="p1" style={{ margin: 15, fontSize: 20 }}>
                Bilgileri Düzenle
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Bilgiler");
                }}
                style={styles.ActionButton}
              >
                <Icon
                  style={{ width: 30, height: 30 }}
                  name="arrow-ios-forward-outline"
                  fill="#000"
                ></Icon>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.ButtonContainer}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon
                style={styles.leftIcon}
                name="settings-outline"
                fill="#000"
              ></Icon>
            </View>
            <View style={{ flex: 3, justifyContent: "center" }}>
              <Text category="p1" style={{ margin: 15, fontSize: 20 }}>
                Ayarlar
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Ayarlar");
                }}
                style={styles.ActionButton}
              >
                <Icon
                  style={{ width: 30, height: 30 }}
                  name="arrow-ios-forward-outline"
                  fill="#000"
                ></Icon>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.ButtonContainer}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon style={styles.leftIcon} name="camera" fill="#000"></Icon>
            </View>
            <View style={{ flex: 3, justifyContent: "center" }}>
              <Text category="p1" style={{ margin: 15, fontSize: 20 }}>
                QR Okut
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("QrScanner")}
                style={styles.ActionButton}
              >
                <Icon
                  style={{ width: 30, height: 30 }}
                  name="arrow-ios-forward-outline"
                  fill="#000"
                ></Icon>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.ButtonContainer}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon
                style={styles.leftIcon}
                name="log-out-outline"
                fill="#000"
              ></Icon>
            </View>
            <View style={{ flex: 3, justifyContent: "center" }}>
              <Text category="p1" style={{ margin: 15, fontSize: 20 }}>
                Çıkış Yap
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity
                onPress={handleLogout}
                style={styles.ActionButton}
              >
                <Icon
                  style={{ width: 30, height: 30 }}
                  name="arrow-ios-forward-outline"
                  fill="#000"
                ></Icon>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A5D19E",
  },
  avatarContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  ButtonContainer: {
    flexDirection: "row",
    height: "15%",
    width: "90%",
    borderRadius: 20,
    margin: 10,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  ActionButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.55)",
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  leftIcon: {
    height: 30,
    width: 30,
  },
});

export default HomeScreen;
