import React, {useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';

import {colors, fontSize} from '../../helpers/styleConstants';
import {REGISTER_BG} from '../../assets/images';
import {
  LOGIN_SCREEN,
  VERIFY_USER_SCREEN,
} from '../../helpers/destinationConstants';
import {ScrollView, Spinner, useToast} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearTempStatus,
  doRegister,
  setTempAuthData,
} from '../../redux/actions/tempAuthActions';
import LoadingScreen from '../../components/LoadingScreen';

export default function Register({navigation}) {
  const toast = useToast();
  const dispatch = useDispatch();
  const {tempAuthReducer} = useSelector(state => state);

  const {data, loading, error, success, isVerifying} = tempAuthReducer;

  useEffect(() => {
    if (error) {
      const id = 'register_error';
      toast.show({
        id,
        title: 'Failed to register',
        status: 'error',
        description: error,
        duration: 3000,
        placement: 'top',
        isClosable: true,
      });
    }

    if (success) {
      const id = 'register_success';
      toast.show({
        id,
        title: 'Register Successful',
        status: 'success',
        description: success,
        duration: 3000,
        placement: 'top',
        isClosable: true,
      });
    }

    if (isVerifying) {
      const oldData = data;
      for (let key in oldData) {
        if (key !== 'username') {
          delete oldData[key];
        }
      }
      dispatch(setTempAuthData(oldData));
      navigation.navigate(VERIFY_USER_SCREEN);
    }
  }, [error, success, isVerifying]);

  useEffect(() => {
    if (success || error) {
      dispatch(clearTempStatus());
    }
  }, []);

  const onRegister = () => {
    const allInputs = Object.keys(data);

    if (allInputs.length < 5) {
      const id = 'fill_all_fields';
      if (!toast.isActive(id)) {
        toast.show({
          id,
          title: 'Please fill all fields',
          description: 'Fill all fields',
          status: 'warning',
          duration: 3000,
          placement: 'bottom',
          isClosable: true,
        });
      }
      return;
    }

    for (const key in data) {
      console.log(key, data[key]);
      if (data[key] === '') {
        const id = 'fill_all_fields';
        if (!toast.isActive(id)) {
          toast.show({
            id,
            title: 'Please fill all fields',
            description: 'Fill all fields',
            status: 'warning',
            placement: 'bottom',
            isClosable: true,
          });
        }
        return;
      }
    }

    dispatch(doRegister(data));
  };

  const goToLogin = () => {
    console.log('go to clicked');
    navigation.navigate(LOGIN_SCREEN);
  };

  const onChangeHandler = (value, field) => {
    dispatch(
      setTempAuthData({
        ...data,
        [field]: value,
      }),
    );
  };

  return (
    <ImageBackground
      source={REGISTER_BG}
      resizeMode={'cover'}
      style={styles.image}>
      {loading && <LoadingScreen title="Sending Data ...." />}
      <ScrollView>
        <SafeAreaView style={styles.container}>
          <Text style={styles.heading}>LET’S HAVE SOME RIDE</Text>
          <View>
            <CustomTextInput
              placeholder="Name"
              value={data.name || ''}
              onChangeText={v => onChangeHandler(v, 'name')}
            />
            <CustomTextInput
              onChangeText={v => onChangeHandler(v, 'email')}
              style={styles.input}
              value={data.email || ''}
              placeholder="Email"
            />
            <CustomTextInput
              onChangeText={v => onChangeHandler(v, 'username')}
              style={styles.input}
              value={data.username || ''}
              placeholder="Username"
            />
            <CustomTextInput
              onChangeText={v => onChangeHandler(v, 'phone')}
              style={styles.input}
              value={data.phone || ''}
              placeholder="Mobile Phone"
            />
            <CustomTextInput
              secureTextEntry={true}
              style={styles.input}
              placeholder="Password"
              value={data.password || ''}
              onChangeText={v => onChangeHandler(v, 'password')}
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
      </ScrollView>
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
    marginBottom: 20,
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
