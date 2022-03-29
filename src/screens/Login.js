import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import CustomTextInput from '../components/CustomTextInput';

import {LOGIN_BG} from '../assets/images';
import {colors, fontSize} from '../helpers/styleConstants';
import CustomButton from '../components/CustomButton';

export default function Login() {
  const signUpClicked = () => {
    console.log('sign up clicked');
  };

  return (
    <ImageBackground
      source={LOGIN_BG}
      resizeMode={'cover'}
      style={styles.image}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>LET’S EXPLORE THE WORLD</Text>
        <View>
          <CustomTextInput placeholder="Username" />
          <CustomTextInput style={styles.input} placeholder="Password" />
          <Text style={styles.link}>Forgot Password</Text>
          <CustomButton styleContainer={styles.button}>Login</CustomButton>
          <Text style={styles.text}>
            Don’t have account?{' '}
            <Text onPress={signUpClicked} style={styles.register}>
              Sign up now
            </Text>
          </Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 21,
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: 50,
    paddingTop: 100,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 36,
    fontWeight: '900',
    color: colors.white,
    width: '80%',
  },
  text: {
    color: colors.white,
    fontSize: fontSize.sm,
    textAlign: 'center',
  },
  link: {
    color: colors.white,
    fontSize: fontSize.sm,
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  register: {
    color: colors.white,
    fontSize: fontSize.sm,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  input: {
    marginTop: 24,
  },
  button: {
    marginTop: 18,
    marginBottom: 53,
  },
});
