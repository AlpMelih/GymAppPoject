import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/api';

const HomeScreen = ({ navigation }) => {
    const [name, setName] = useState('');

    useEffect(() => {
        const getUser = async () => {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                navigation.navigate('Login');
                return;
            }

            try {
                const res = await api.get('/auth/user', {
                    headers: { 'x-auth-token': token }
                });
                setName(res.data.name);
            } catch (err) {
                console.error(err);
                navigation.navigate('Login');
            }
        };

        getUser();
    }, [navigation]);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('token');
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
          <View style={{flex:1,backgroundColor:"red",alignItems:"center",justifyContent:"center"}}>

          </View>

          <View style={{flex:3}}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
        backgroundColor:"#A5D19E"
    },
});

export default HomeScreen;
