import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import CustomTextInput from '../components/CustomTextInput';

import Fa5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  colors,
  fontFamily,
  fontSize,
  fontStyle,
} from '../helpers/styleConstants';
import {FORGOT_PASSWORD_BG} from '../assets/images';

export default function ForgotPassword({navigation}) {
  const sendEmail = () => {
    console.log('send email clicked');
  };

  const reSendEmail = () => {
    console.log('send email clicked');
  };

  const goPreviousPage = () => {
    console.log('back clicked');
    navigation.goBack();
  };

  return (
    <ImageBackground
      source={FORGOT_PASSWORD_BG}
      resizeMode={'cover'}
      style={styles.image}>
      <SafeAreaView style={styles.container}>
        <View style={styles.backBtn}>
          <Fa5Icon
            name="chevron-left"
            size={fontSize.xl}
            color={colors.white}
            onPress={goPreviousPage}
          />
          <Text onPress={goPreviousPage} style={[styles.text, styles.backText]}>
            Back
          </Text>
        </View>
        <Text style={styles.heading}>THAT’S OKAY, WE GOT YOUR BACK</Text>
        <View>
          <Text style={styles.text}>
            Enter your email to get reset password code
          </Text>
          <CustomTextInput
            style={styles.input}
            placeholder="Enter your email address"
          />
          <CustomButton onPress={sendEmail} styleContainer={styles.button}>
            Send Code
          </CustomButton>
          <CustomButton
            onPress={reSendEmail}
            variant={'secondary'}
            styleText={{color: colors.primary}}>
            Resend Code
          </CustomButton>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 21,
    flex: 1,
    paddingBottom: 150,
    paddingTop: 30,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 36,
    color: colors.white,
    width: '90%',
    textAlign: 'center',
    fontFamily: fontStyle(fontFamily.secondary, 'black'),
    marginBottom: 100,
  },
  text: {
    color: colors.white,
    fontSize: fontSize.sm,
    textAlign: 'center',
    fontFamily: fontStyle(fontFamily.primary, 'bold'),
  },
  backText: {
    fontSize: fontSize.lg,
    marginLeft: 40,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 108,
  },
  input: {
    marginTop: 24,
    backgroundColor: 'rgba(255,255,255,0.5)',
    fontSize: fontSize.sm,
  },
  button: {
    marginTop: 18,
    marginBottom: 8,
  },
});
