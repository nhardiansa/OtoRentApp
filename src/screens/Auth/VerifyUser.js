import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
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
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView, useToast} from 'native-base';
import {
  clearTempStatus,
  resendCodeVerification,
  sendVerifyData,
  setIsVerifying,
} from '../../redux/actions/tempAuthActions';
import LoadingScreen from '../../components/LoadingScreen';
import {capitalize} from '../../helpers/formatter';
import {LOGIN_SCREEN} from '../../helpers/destinationConstants';

export default function VerifyUser({navigation}) {
  const toast = useToast();
  const dispatch = useDispatch();
  const {tempAuthReducer} = useSelector(state => state);
  const {data, loading, error, success, isVerifying} = tempAuthReducer;

  const [code, setCode] = useState('');

  useEffect(() => {
    if (error) {
      const id = 'verify_error';
      if (!toast.isActive(id)) {
        toast.show({
          id,
          title: 'Failed to verify',
          status: 'error',
          description: error,
          placement: 'top',
          isClosable: true,
        });
      }
    }

    if (success) {
      const id = 'verify_success';
      if (!toast.isActive(id)) {
        toast.show({
          id,
          title: capitalize(success),
          status: 'success',
          placement: 'top',
          isClosable: true,
        });
      }
    }

    if (!isVerifying) {
      navigation.replace(LOGIN_SCREEN);
    }

    console.log(data);
  }, [error, isVerifying, success]);

  useEffect(() => {
    if ((success || error) && !code) {
      dispatch(clearTempStatus());
    }
  }, []);

  const sendCode = () => {
    if (!code) {
      const id = 'fill_code_field';
      if (!toast.isActive(id)) {
        toast.show({
          id,
          title: 'Cannot send empty code',
          description: 'Fill code field',
          status: 'warning',
          placement: 'top',
          isClosable: true,
        });
      }
      return;
    }

    const finalData = {
      ...data,
      code,
    };

    dispatch(sendVerifyData(finalData));
  };

  const resendCode = () => {
    dispatch(resendCodeVerification(data));
  };

  const goPreviousPage = () => {
    console.log('back clicked');
    navigation.replace(LOGIN_SCREEN);
  };

  const onChangeCodeHandler = value => {
    if (!isNaN(value)) {
      setCode(value);
    }
  };

  return (
    <ScrollView>
      <ImageBackground
        source={FORGOT_PASSWORD_BG}
        resizeMode={'cover'}
        style={styles.image}>
        {loading && <LoadingScreen />}
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
          <Text style={styles.heading}>VERIFY YOURSELF</Text>
          <View>
            <Text style={styles.text}>
              Enter code that we sent to your email to verify your account.
            </Text>
            <CustomTextInput
              style={styles.input}
              value={code}
              onChangeText={onChangeCodeHandler}
              keyboardType="numeric"
              placeholder="Enter code to verify"
            />
            <CustomButton
              key="sendCode"
              onPress={sendCode}
              styleContainer={styles.button}>
              Send Code
            </CustomButton>
            <CustomButton
              key="resendCode"
              onPress={resendCode}
              variant={'secondary'}
              styleText={{color: colors.primary}}>
              Resend Code
            </CustomButton>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </ScrollView>
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
