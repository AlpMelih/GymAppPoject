import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../utils/api';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const[ress,setress]=useState("a")
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const res = await api.post('/auth/login', { email, password });
            setress(res)
            await AsyncStorage.setItem('token', res.data.token);
            navigation.navigate('Home');
        } catch (err) {
            console.error('Error:', err);
            console.log(ress)
            alert('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <Text>Password</Text>
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Register" onPress={() => navigation.navigate('Register')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default LoginScreen;
