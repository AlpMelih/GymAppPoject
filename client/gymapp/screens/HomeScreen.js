import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../utils/api";
import { Avatar, Icon, Text, useTheme } from "@ui-kitten/components";

const HomeScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const theme = useTheme();
  const isDarkMode = theme["background-basic-color-1"] === "#222B45";

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
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? theme["background-basic-color-1"]
            : "#A5D19E",
        },
      ]}
    >
      <View style={styles.avatarContainer}>
        <Avatar
          style={styles.avatar}
          shape="rounded"
          source={require("../assets/ALP.jpeg")}
        />
      </View>
      <View style={{ flex: 3 }}>
        <View style={{ flex: 1, margin: 30, alignItems: "center" }}>
          {[
            {
              icon: "edit-outline",
              text: "Bilgileri Düzenle",
              navigateTo: "Bilgiler",
            },
            {
              icon: "settings-outline",
              text: "Ayarlar",
              navigateTo: "Ayarlar",
            },
            {
              icon: "camera",
              text: "QR Okut",
              navigateTo: "QrScanner",
            },
            {
              icon: "log-out-outline",
              text: "Çıkış Yap",
              action: handleLogout,
            },
          ].map((item, index) => (
            <View
              style={[
                styles.ButtonContainer,
                {
                  backgroundColor: isDarkMode
                    ? theme["background-basic-color-2"]
                    : "rgba(255, 255, 255, 0.5)",
                },
              ]}
              key={index}
            >
              <View style={styles.iconContainer}>
                <Icon
                  style={styles.leftIcon}
                  name={item.icon}
                  fill={theme["text-basic-color"]}
                />
              </View>
              <View style={{ flex: 3, justifyContent: "center" }}>
                <Text
                  category="p1"
                  style={[styles.text, { color: theme["text-basic-color"] }]}
                >
                  {item.text}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <TouchableOpacity
                  onPress={() =>
                    item.action
                      ? item.action()
                      : navigation.navigate(item.navigateTo)
                  }
                  style={[
                    styles.ActionButton,
                    {
                      backgroundColor: isDarkMode
                        ? theme["background-basic-color-3"]
                        : "rgba(255, 255, 255, 0.55)",
                    },
                  ]}
                >
                  <Icon
                    style={styles.rightIcon}
                    name="arrow-ios-forward-outline"
                    fill={theme["text-basic-color"]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    margin: 15,
    fontSize: 20,
  },
  ActionButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  leftIcon: {
    height: 30,
    width: 30,
  },
  rightIcon: {
    width: 30,
    height: 30,
  },
});

export default HomeScreen;
