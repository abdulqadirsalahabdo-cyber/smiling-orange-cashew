import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  Alert, SafeAreaView, Image, ScrollView 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function App() {
  // يبدأ التطبيق مباشرة على الصفحة الشخصية كما طلبت
  const [currentScreen, setCurrentScreen] = useState('profile');

  // بيانات البروفايل الافتراضية
  const [profileName, setProfileName] = useState('John Doe');
  const [profileEmail, setProfileEmail] = useState('user@example.com');
  const [profileBio, setProfileBio] = useState('مهتم بإدارة المهام وتطوير البرمجيات.');
  const [profileImage, setProfileImage] = useState(null);
  
  // حالات تعديل الوصف
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [tempBio, setTempBio] = useState('');

  // حالات تسجيل الدخول والإنشاء
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  
  // نظام الكود التلقائي (يتم توليد كود عشوائي من 4 أرقام وإظهاره للمستخدم مباشرة)
  const [verificationCode, setVerificationCode] = useState('');
  const [sentCode, setSentCode] = useState('1234');

  // اختيار الصورة
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  // حفظ الوصف
  const saveBio = () => {
    setProfileBio(tempBio);
    setIsEditingBio(false);
  };

  // تسجيل الدخول
  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      Alert.alert('تنبيه', 'الرجاء إدخال البريد الإلكتروني وكلمة المرور');
      return;
    }
    setProfileEmail(loginEmail);
    setCurrentScreen('profile');
  };

  // تسجيل حساب جديد وتوليد كود حقيقي يظهر لك فوراً
  const handleRegisterSubmit = () => {
    if (!regName || !regEmail || !regPhone || !regPassword) {
      Alert.alert('تنبيه', 'الرجاء ملء جميع الحقول المطلوبة');
      return;
    }
    
    // توليد كود تحقق عشوائي من 4 أرقام لضمان عمل التجربة بنجاح تام
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    setSentCode(randomCode);

    setProfileName(regName);
    setProfileEmail(regEmail);

    // إظهار الكود مباشرة في تنبيه على الشاشة لكي تتخطى مشكلة عدم وصول الإيميل
    Alert.alert(
      'تم إرسال الكود بنجاح', 
      `رمز التأكيد الخاص بك هو: ${randomCode}\n(تم عرضه هنا لأن التطبيق يعمل محلياً بدون سيرفر إيميلات)`
    );
    
    setCurrentScreen('verify');
  };

  // التحقق من الكود المدخل
  const handleVerifyCode = () => {
    if (verificationCode === sentCode) {
      Alert.alert('نجاح', 'تم تأكيد حسابك بنجاح!');
      setCurrentScreen('profile');
    } else {
      Alert.alert('خطأ', `رمز التأكيد غير صحيح. الكود المطلوب هو: ${sentCode}`);
    }
  };

  // ================= 1. الصفحة الشخصية (Profile) =================
  if (currentScreen === 'profile') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.card}>
            <Text style={styles.title}>الصفحة الشخصية</Text>

            <View style={styles.imageContainer}>
              <TouchableOpacity onPress={pickImage}>
                {profileImage ? (
                  <Image source={{ uri: profileImage }} style={styles.avatar} />
                ) : (
                  <View style={styles.placeholderAvatar}>
                    <Text style={styles.avatarPlaceholderText}>أضف صورة</Text>
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity style={styles.changePicButton} onPress={pickImage}>
                <Text style={styles.changePicText}>تغيير الصورة</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.profileName}>{profileName}</Text>
            <Text style={styles.profileEmail}>{profileEmail}</Text>
            <Text style={styles.verifiedText}>✓ تم تأكيد حسابك</Text>

            <View style={styles.bioSection}>
              <Text style={styles.label}>نبذة عني / الوصف:</Text>
              {isEditingBio ? (
                <View>
                  <TextInput 
                    style={styles.textArea}
                    multiline
                    value={tempBio}
                    onChangeText={setTempBio}
                    placeholder="اكتب وصفاً عنك..."
                    placeholderTextColor="#888"
                  />
                  <TouchableOpacity style={styles.smallButton} onPress={saveBio}>
                    <Text style={styles.buttonText}>حفظ الوصف</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <Text style={styles.bioText}>{profileBio}</Text>
                  <TouchableOpacity 
                    style={styles.editBioButton} 
                    onPress={() => { setTempBio(profileBio); setIsEditingBio(true); }}
                  >
                    <Text style={styles.editBioText}>تعديل الوصف</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>

            <TouchableOpacity 
              style={[styles.button, { backgroundColor: '#007AFF', marginTop: 25 }]} 
              onPress={() => setCurrentScreen('login')}
            >
              <Text style={styles.buttonText}>تسجيل الدخول</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ================= 2. شاشة تسجيل الدخول (Login) =================
  if (currentScreen === 'login') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.card}>
            <Text style={styles.title}>تسجيل الدخول</Text>
            
            <Text style={styles.label}>البريد الإلكتروني / رقم الهاتف</Text>
            <TextInput 
              style={styles.input}
              placeholder="أدخل البريد أو رقم الهاتف"
              placeholderTextColor="#888"
              value={loginEmail}
              onChangeText={setLoginEmail}
            />

            <Text style={styles.label}>كلمة المرور</Text>
            <TextInput 
              style={styles.input}
              placeholder="أدخل كلمة المرور"
              placeholderTextColor="#888"
              secureTextEntry
              value={loginPassword}
              onChangeText={setLoginPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>دخول</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.switchButton} onPress={() => setCurrentScreen('register')}>
              <Text style={styles.switchText}>ليس لديك حساب؟ <Text style={styles.linkText}>إنشاء حساب جديد</Text></Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ================= 3. شاشة إنشاء حساب جديد (Register) =================
  if (currentScreen === 'register') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.card}>
            <Text style={styles.title}>إنشاء حساب جديد</Text>
            
            <Text style={styles.label}>الاسم بالكامل</Text>
            <TextInput 
              style={styles.input}
              placeholder="أدخل اسمك"
              placeholderTextColor="#888"
              value={regName}
              onChangeText={setRegName}
            />

            <Text style={styles.label}>البريد الإلكتروني</Text>
            <TextInput 
              style={styles.input}
              placeholder="example@gmail.com"
              placeholderTextColor="#888"
              value={regEmail}
              onChangeText={setRegEmail}
            />

            <Text style={styles.label}>رقم الهاتف</Text>
            <TextInput 
              style={styles.input}
              placeholder="010XXXXXXXX"
              placeholderTextColor="#888"
              keyboardType="phone-pad"
              value={regPhone}
              onChangeText={setRegPhone}
            />

            <Text style={styles.label}>كلمة المرور</Text>
            <TextInput 
              style={styles.input}
              placeholder="أدخل كلمة المرور"
              placeholderTextColor="#888"
              secureTextEntry
              value={regPassword}
              onChangeText={setRegPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleRegisterSubmit}>
              <Text style={styles.buttonText}>تسجيل البيانات وإرسال الكود</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.switchButton} onPress={() => setCurrentScreen('login')}>
              <Text style={styles.switchText}>لديك حساب بالفعل؟ <Text style={styles.linkText}>تسجيل الدخول</Text></Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // ================= 4. شاشة تأكيد الكود (Verify) =================
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>تأكيد الحساب</Text>
          <Text style={styles.subtitleVerify}>
            تم توليد كود التأكيد الخاص بك. (انظر التنبيه الذي ظهر لك أو اكتب الكود المُرسل).
          </Text>

          <Text style={styles.label}>أدخل رمز التأكيد (4 أرقام)</Text>
          <TextInput 
            style={[styles.input, { textAlign: 'center', letterSpacing: 5, fontSize: 20 }]}
            placeholder="----"
            placeholderTextColor="#888"
            keyboardType="number-pad"
            maxLength={4}
            value={verificationCode}
            onChangeText={setVerificationCode}
          />

          <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
            <Text style={styles.buttonText}>تأكيد الحساب والدخول</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollContainer: {
    flexGrow: 1,
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
  subtitleVerify: {
    color: '#aaa',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
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
  textArea: {
    backgroundColor: '#2A2A2A',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    textAlign: 'right',
    height: 80,
    textAlignVertical: 'top',
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
  smallButton: {
    backgroundColor: '#34C759',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  switchButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  switchText: {
    color: '#aaa',
    fontSize: 14,
  },
  linkText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  placeholderAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#444',
  },
  avatarPlaceholderText: {
    color: '#aaa',
    fontSize: 14,
  },
  changePicButton: {
    marginTop: 8,
  },
  changePicText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  profileEmail: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 5,
  },
  verifiedText: {
    color: '#34C759',
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  bioSection: {
    backgroundColor: '#252525',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  bioText: {
    color: '#ddd',
    fontSize: 14,
    textAlign: 'right',
    marginBottom: 10,
    lineHeight: 20,
  },
  editBioButton: {
    alignSelf: 'flex-start',
  },
  editBioText: {
    color: '#007AFF',
    fontSize: 13,
  },
});