import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function goTo() {
    if (email == 'luqman@upsi.com' && password == 12345) {
      navigation.navigate('Chatbot');
    } else if (email == 'adilah@upsi.com' && password == 12345) {
      navigation.navigate('Chatbot');
    } else if (email == 'dnisha@upsi.com' && password == 12345) {
      navigation.navigate('Chatbot');
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Image
          source={require('../assets/pictures/chac.png')}
          style={styles.logo}
        />
        <Text style={styles.text}>myCHAC-upsi</Text>

        <FormInput
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholderText="Student Email"
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <FormInput
          labelValue={password}
          onChangeText={(userPassword) => setPassword(userPassword)}
          placeholderText="Password"
          iconType="lock"
          secureTextEntry={true}
        />

        <FormButton
          buttonTitle="Sign In"
          onPress={() => {
            goTo();
          }}
        />

        {/* <FormButton
        buttonTitle="Sign In"
        onPress={() => navigation.navigate('Chatbot')}
      /> */}

        <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
          <Text style={styles.navButtonText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 88,
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
});

export default LoginScreen;
