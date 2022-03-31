import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import React from 'react';
import CustomTextInput from '../../components/CustomTextInput';

import {LOGIN_BG} from '../../assets/images';
import {
  colors,
  fontFamily,
  fontSize,
  fontStyle,
} from '../../helpers/styleConstants';
import CustomButton from '../../components/CustomButton';
import {
  FORGOT_PASSWORD_SCREEN,
  HOME_SCREEN,
  REGISTER_SCREEN,
} from '../../helpers/destinationConstants';

export default function Login({navigation}) {
  const goToRegister = () => {
    console.log('sign up clicked');
    navigation.navigate(REGISTER_SCREEN);
  };

  const goToForgotPassword = () => {
    console.log('forgot clicked');
    navigation.navigate(FORGOT_PASSWORD_SCREEN);
  };

  const onLogin = () => {
    console.log('login clicked');
    navigation.navigate(HOME_SCREEN);
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
          <Text style={styles.link} onPress={goToForgotPassword}>
            Forgot Password
          </Text>
          <CustomButton onPress={onLogin} styleContainer={styles.button}>
            Login
          </CustomButton>
          <Text style={styles.text}>
            Don’t have account?{' '}
            <Text onPress={goToRegister} style={styles.register}>
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
    fontFamily: fontStyle(fontFamily.secondary, 'black'),
  },
  text: {
    color: colors.white,
    fontSize: fontSize.sm,
    textAlign: 'center',
    fontFamily: fontStyle(fontFamily.primary),
  },
  link: {
    color: colors.white,
    fontSize: fontSize.sm,
    textDecorationLine: 'underline',
    marginTop: 10,
    fontFamily: fontStyle(fontFamily.primary, 'bold'),
  },
  register: {
    color: colors.white,
    fontSize: fontSize.sm,
    textDecorationLine: 'underline',
    fontFamily: fontStyle(fontFamily.primary, 'bold'),
  },
  input: {
    marginTop: 24,
  },
  button: {
    marginTop: 18,
    marginBottom: 53,
  },
});
