import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../utils/api";
import {
  Text,
  Input,
  Button,
  Avatar,
  Select,
  SelectItem,
  useTheme,
  IndexPath,
} from "@ui-kitten/components";

const UserInfo = ({ navigation }) => {
  const [user, setUser] = useState({
    age: "",
    height: "",
    weight: "",
    gender: "",
  });
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isDarkMode = theme["background-basic-color-1"] === "#222B45";
  const [selectedGenderIndex, setSelectedGenderIndex] = useState(
    new IndexPath(-1)
  );
  const [genderr, setGenderr] = useState("");

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
        setUser(res.data);
        // Set the selected index based on gender
        const index =
          res.data.gender === "Kadın"
            ? 0
            : res.data.gender === "Erkek"
            ? 1
            : -1;
        setSelectedGenderIndex(new IndexPath(index));
        setGenderr(res.data.gender); // Set the initial gender value
      } catch (err) {
        console.error(err);
        navigation.navigate("Login");
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [navigation]);

  useEffect(() => {
    // Update selectedGenderIndex when genderr changes
    const index = genderr === "Kadın" ? 0 : genderr === "Erkek" ? 1 : -1;
    setSelectedGenderIndex(new IndexPath(index));
  }, [genderr]);

  const handleSave = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!token) {
      navigation.navigate("Login");
      return;
    }

    const gender = selectedGenderIndex.row === 0 ? "Kadın" : "Erkek";

    try {
      const res = await api.put(
        "/auth/user",
        {
          age: user.age,
          height: user.height,
          weight: user.weight,
          gender: gender, // Use the selected gender here
        },
        {
          headers: { "x-auth-token": token },
        }
      );
      Alert.alert("Başarılı", "Kullanıcı bilgileri başarıyla güncellendi");
      setUser(res.data);
      setGenderr(gender); // Update genderr state after successful save
    } catch (err) {
      console.error(err);
      Alert.alert("Hata", "Kullanıcı bilgilerini güncellerken hata oluştu");
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

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
        <Text category="h5" style={styles.username}>
          {user.name}
        </Text>
      </View>
      <Input
        style={styles.input}
        label="Yaş"
        value={user.age.toString()}
        onChangeText={(text) => setUser({ ...user, age: text })}
        keyboardType="numeric"
      />
      <Input
        style={styles.input}
        label="Boy (cm)"
        value={user.height.toString()}
        onChangeText={(text) => setUser({ ...user, height: text })}
        keyboardType="numeric"
      />
      <Input
        style={styles.input}
        label="Kilo (kg)"
        value={user.weight.toString()}
        onChangeText={(text) => setUser({ ...user, weight: text })}
        keyboardType="numeric"
      />
      <Select
        label="Cinsiyet"
        value={genderr}
        selectedIndex={selectedGenderIndex}
        onSelect={(index) => {
          const genderValue = index.row === 0 ? "Kadın" : "Erkek";
          setGenderr(genderValue); // Update genderr state on selection
          setSelectedGenderIndex(index);
        }}
        style={styles.select}
      >
        <SelectItem title="Kadın" />
        <SelectItem title="Erkek" />
      </Select>
      <Button style={styles.button} onPress={handleSave}>
        Kaydet
      </Button>
      <View style={styles.bmiContainer}>
        <Text category="h6">Vücut Kitle İndeksi:</Text>
        <Text category="s1" style={styles.bmiValue}>
          {calculateBMI(user.height, user.weight)}
        </Text>
        <Text category="s1" style={styles.bmiDescription}>
          {getBMIDescription(calculateBMI(user.height, user.weight))}
        </Text>
      </View>
    </View>
  );
};

const calculateBMI = (height, weight) => {
  if (!height || !weight) return "Hesaplanamıyor";
  const heightInMeters = height / 100; // cm to meters
  return (weight / (heightInMeters * heightInMeters)).toFixed(1);
};

const getBMIDescription = (bmi) => {
  if (bmi < 18.5) return "Zayıf";
  if (bmi >= 18.5 && bmi <= 24.999) return "Normal";
  if (bmi >= 25 && bmi <= 29.9) return "Fazla Kilolu";
  return "Obez";
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  username: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    marginVertical: 10,
    width: "90%",
  },
  button: {
    marginVertical: 20,
    width: "90%",
  },
  select: {
    width: "90%",
    marginVertical: 10,
  },
  bmiContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  bmiValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  bmiDescription: {
    textAlign: "center",
    marginTop: 5,
  },
});

export default UserInfo;
