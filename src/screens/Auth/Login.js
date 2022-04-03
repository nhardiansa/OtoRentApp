import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import CustomTextInput from '../../components/CustomTextInput';

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
  REGISTER_SCREEN,
} from '../../helpers/destinationConstants';
import {Box, Input, Pressable, useToast} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {onLogin as loginAction} from '../../redux/actions/authActions';
import IOIcon from 'react-native-vector-icons/Ionicons';

export default function Login({navigation}) {
  const {authReducer} = useSelector(state => state);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const toast = useToast();

  useEffect(() => {
    if (authReducer.error) {
      toast.show({
        description: authReducer.error,
      });
    }
  }, [authReducer]);

  const goToRegister = () => {
    console.log('sign up clicked');
    navigation.navigate(REGISTER_SCREEN);
  };

  const goToForgotPassword = () => {
    console.log('forgot clicked');
    navigation.navigate(FORGOT_PASSWORD_SCREEN);
  };

  const onLogin = () => {
    if (!email || !password) {
      toast.show({
        description: 'Please enter valid email and password',
      });
      return;
    }

    console.log(email, password);

    dispatch(loginAction(email, password));

    // navigation.navigate(HOME_SCREEN);
  };

  return (
    <ImageBackground
      source={LOGIN_BG}
      resizeMode={'cover'}
      style={styles.image}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>LET’S EXPLORE THE WORLD</Text>
        <View>
          {/* {/* <CustomTextInput placeholder="Username" /> */}
          {/* <CustomTextInput style={styles.input} placeholder="Password" /> */}
          <Input
            onChangeText={text => setEmail(text)}
            placeholder="Username"
            bgColor="rgba(223, 222, 222, 0.3)"
            fontFamily={fontStyle(fontFamily.primary, 'bold')}
            placeholderTextColor={colors.white}
            borderWidth={0}
            color={colors.white}
            mb="5"
          />
          <Input
            onChangeText={text => setPassword(text)}
            placeholder="Password"
            bgColor="rgba(223, 222, 222, 0.3)"
            fontFamily={fontStyle(fontFamily.primary, 'bold')}
            placeholderTextColor={colors.white}
            borderWidth={0}
            color={colors.white}
            secureTextEntry={showPassword}
            InputRightElement={
              <Box mr="4">
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <IOIcon name="ios-eye" size={24} color={colors.white} />
                  ) : (
                    <IOIcon name="ios-eye-off" size={24} color={colors.white} />
                  )}
                </Pressable>
              </Box>
            }
          />
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
