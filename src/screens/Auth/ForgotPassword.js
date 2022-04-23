import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  TouchableWithoutFeedback,
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';

import Fa5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  colors,
  fontFamily,
  fontSize,
  fontStyle,
} from '../../helpers/styleConstants';
import {FORGOT_PASSWORD_BG} from '../../assets/images';
import {ScrollView, useToast} from 'native-base';
import {capitalize} from '../../helpers/formatter';
import {axiosInstance} from '../../helpers/http';
import qs from 'query-string';
import LoadingScreen from '../../components/LoadingScreen';
import {useDispatch, useSelector} from 'react-redux';
import {
  LOGIN_SCREEN,
  VERIFY_USER_SCREEN,
} from '../../helpers/destinationConstants';
import {
  setIsVerifying,
  setTempAuthData,
} from '../../redux/actions/tempAuthActions';

import validator from 'validator';

export default function ForgotPassword({navigation}) {
  const dispatch = useDispatch();
  const {isVerifying} = useSelector(state => state.tempAuthReducer);

  const [forgotData, setForgotData] = useState({
    username: '',
    password: '',
    confirm_password: '',
    code: '',
  });

  const toast = useToast();
  const [isSend, setIsSend] = useState(false);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (error) {
      // const id = 'forgot_password_error';
      // if (!toast.isActive(id)) {
      toast.show({
        // id,
        title: capitalize(error),
        status: 'error',
        isClosable: true,
        duration: 3000,
        placement: 'top',
      });
      // }
    }

    if (success) {
      // const id = 'forgot_password_success';
      toast.show({
        // id,
        title: capitalize(success),
        status: 'success',
        isClosable: true,
        duration: 3000,
        placement: 'top',
      });
    }

    if (isVerifying) {
      navigation.replace(VERIFY_USER_SCREEN);
    }
  }, [error, success, isVerifying]);

  const sendCode = async () => {
    if (!forgotData.username) {
      setError('Username is required');
      return;
    }

    try {
      setError('');
      setSuccess('');
      setIsLoading(true);

      const params = qs.stringify({
        username: forgotData.username,
      });

      const {data} = await axiosInstance().post('/auth/confirm-reset', params);

      const message = data.message;

      console.log(data);

      if (!message.includes('reset')) {
        dispatch(setTempAuthData({username: forgotData.username}));
        dispatch(setIsVerifying(true));
        setIsLoading(false);
      } else {
        setIsSend(true);
        setIsLoading(false);
        setSuccess(message);
      }
    } catch (err) {
      if (err.response) {
        console.error(err.response);
        setError(err.response.data.message);
      } else {
        console.error(err);
        setError(err.message);
      }
      setIsLoading(false);
    }
  };

  const resendCode = () => {
    sendCode();
  };

  const sendResetData = async () => {
    if (
      !forgotData.username ||
      !forgotData.code ||
      !forgotData.password ||
      !forgotData.confirm_password
    ) {
      setError('All fields are required');
      return;
    }

    if (forgotData.password !== forgotData.confirm_password) {
      setError('Passwords do not match');
      return;
    }

    const passwordRules = {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    };

    if (!validator.isStrongPassword(forgotData.password, passwordRules)) {
      setError(
        'Password must be at least 6 characters long, contain at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol',
      );
      return;
    }

    try {
      setError('');
      setSuccess('');
      setIsLoading(true);

      const params = qs.stringify(forgotData);

      const {data} = await axiosInstance().post('/auth/confirm-reset', params);

      if (data.success) {
        setSuccess(data.message);
        setIsLoading(false);
        navigation.replace(LOGIN_SCREEN);
      } else {
        setError(data.message);
        setIsLoading(false);
        navigation.replace(LOGIN_SCREEN);
      }
    } catch (err) {
      if (err.response) {
        console.error(err.response);
        setError(err.response.data.message);
      } else {
        console.error(err);
        setError(err.message);
      }
      setIsLoading(false);
    }
  };

  const goPreviousPage = () => {
    console.log('back clicked');
    navigation.goBack();
  };

  const onChangeField = (value, field) => {
    setError('');
    setSuccess('');
    setForgotData({...forgotData, [field]: value});
  };

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
      marginBottom: isSend ? 50 : 120,
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
      marginBottom: isSend ? 50 : 100,
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

  return (
    <>
      {isLoading && <LoadingScreen />}

      <ScrollView>
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
              <Text
                onPress={goPreviousPage}
                style={[styles.text, styles.backText]}>
                Back
              </Text>
            </View>
            <Text style={styles.heading}>THAT’S OKAY, WE GOT YOUR BACK</Text>
            <View>
              {!isSend ? (
                <>
                  <Text style={styles.text}>
                    Enter your email to get reset password code
                  </Text>
                  <CustomTextInput
                    style={styles.input}
                    placeholder="Enter your email address"
                    onChangeText={value => onChangeField(value, 'username')}
                  />
                </>
              ) : (
                <>
                  <CustomTextInput
                    style={styles.input}
                    placeholder="Enter reset code"
                    onChangeText={value => onChangeField(value, 'code')}
                  />
                  <CustomTextInput
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder="Enter new password"
                    onChangeText={value => onChangeField(value, 'password')}
                  />
                  <CustomTextInput
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder="Enter confirm password"
                    onChangeText={value =>
                      onChangeField(value, 'confirm_password')
                    }
                  />
                </>
              )}

              {!isSend ? (
                <CustomButton onPress={sendCode} styleContainer={styles.button}>
                  Send Code
                </CustomButton>
              ) : (
                <>
                  <CustomButton
                    onPress={sendResetData}
                    styleContainer={styles.button}>
                    Reset Password
                  </CustomButton>
                </>
              )}

              <CustomButton
                onPress={resendCode}
                variant={'secondary'}
                styleText={{color: colors.primary}}>
                Resend Code
              </CustomButton>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </ScrollView>
    </>
  );
}
