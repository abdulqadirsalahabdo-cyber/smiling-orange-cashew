import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('تنبيه', 'الرجاء إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }
    Alert.alert('نجاح', 'تم تسجيل الدخول بنجاح!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>تسجيل الدخول</Text>
        
        <Text style={styles.label}>البريد الإلكتروني</Text>
        <TextInput 
          style={styles.input}
          placeholder="أدخل بريدك الإلكتروني"
          placeholderTextColor="#888"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>كلمة المرور</Text>
        <TextInput 
          style={styles.input}
          placeholder="أدخل كلمة المرور"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>دخول</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#1E1E1E',
    width: '100%',
    padding: 20,
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
    textAlign: 'right',
  },
  input: {
    backgroundColor: '#2A2A2A',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    textAlign: 'right',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});