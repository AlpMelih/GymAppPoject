import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Input, Toggle, Button } from "@ui-kitten/components";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../utils/api"; // Make sure you have an API utility to handle requests

const Settings = ({ toggleTheme }) => {
  const [name, setName] = useState(""); // Change username to name

  useEffect(() => {
    const loadUserData = async () => {
      const storedUsername = await AsyncStorage.getItem("username");
      const token = await AsyncStorage.getItem("token"); // Assuming you have a token stored

      if (storedUsername) {
        setName(storedUsername);
      }

      // Load the user data from the API
      if (token) {
        try {
          const res = await api.get("/auth/user", {
            headers: { "x-auth-token": token },
          });
          setName(res.data.name); // Set the name from user data
        } catch (error) {
          console.error("Failed to load user data:", error);
        }
      }
    };
    loadUserData();
  }, []);

  const handleNameChange = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return; // Ensure token exists
    }

    console.log("Updated name:", name); // Log the updated name
    try {
      const response = await api.put(
        "/auth/user",
        { name }, // Send the updated name
        { headers: { "x-auth-token": token } }
      );
      console.log("Name updated successfully:", response.data); // Log success response
    } catch (error) {
      console.error(
        "Failed to update name:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <View style={styles.container}>
      <Input
        label="Ad"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <View style={styles.toggleContainer}>
        <Text>Karanlık Mod</Text>
        <Toggle onChange={toggleTheme} />
      </View>
      <Button onPress={handleNameChange}>Adını Değiştir</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginBottom: 20,
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default Settings;
