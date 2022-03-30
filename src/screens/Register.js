import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';

import {colors, fontSize} from '../helpers/styleConstants';
import {REGISTER_BG} from '../assets/images';
import {LOGIN_SCREEN} from '../helpers/destinationConstants';

export default function Register({navigation}) {
  const onRegister = () => {
    console.log('got to clicked');
    navigation.navigate(LOGIN_SCREEN);
  };

  const goToLogin = () => {
    console.log('go to clicked');
    navigation.navigate(LOGIN_SCREEN);
  };

  return (
    <ImageBackground
      source={REGISTER_BG}
      resizeMode={'cover'}
      style={styles.image}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>LET’S HAVE SOME RIDE</Text>
        <View>
          <CustomTextInput placeholder="Email" />
          <CustomTextInput style={styles.input} placeholder="Mobile Phone" />
          <CustomTextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Password"
          />
          <CustomButton onPress={onRegister} styleContainer={styles.button}>
            Register
          </CustomButton>
          <Text style={styles.text}>
            Already have an account?{' '}
            <Text onPress={goToLogin} style={styles.register}>
              Login now
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
    marginTop: 32,
    marginBottom: 44,
  },
});
