import {VirtualizedList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Box,
  FlatList,
  Heading,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  useToast,
} from 'native-base';
import {fontFamily, fontStyle} from '../../helpers/styleConstants';
import {axiosInstance} from '../../helpers/http';
import {useDispatch, useSelector} from 'react-redux';
import HistoryItem from '../../components/HistoryItem';
import {getTransactionDetail} from '../../redux/actions/transactionActions';
import LoadingScreen from '../../components/LoadingScreen';
import {
  FINISH_PAYMENT,
  PAYMENT_DETAIL,
  PAYMENT_STACK,
} from '../../helpers/destinationConstants';

export default function History({navigation}) {
  const dispatch = useDispatch();
  const {authReducer, transactionReducer} = useSelector(state => state);
  const {token} = authReducer.user;
  const {loading: trxLoading, error: trxError} = transactionReducer;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShow: true,
    });
  }, [navigation]);

  const toast = useToast();
  const [histories, setHistories] = useState([]);
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    if (authReducer.user) {
      getHistories();
    }
  }, [authReducer]);

  useEffect(() => {
    if (trxError) {
      const id = trxError;
      if (!toast.isActive(id)) {
        toast.show({
          id,
          title: 'Error',
          description: trxError,
          status: 'error',
          duration: 3000,
          placement: 'top',
        });
      }
    }

    console.log('error section');
  }, [trxLoading, trxError, toast]);

  const getHistories = async () => {
    try {
      const {data} = await axiosInstance(token).get('/histories?limit=10');

      if (!data.success) {
        toast.show({
          description: data.message,
          duration: 3000,
          position: 'top',
          status: 'error',
        });
        return;
      }

      console.log(data);

      setHistories(data.results);
    } catch (err) {
      if (err.response) {
        toast.show({
          description: err.response.data.message,
          status: 'error',
          placement: 'top',
          duration: 3000,
        });
      } else {
        toast.show({
          description: err.message,
          status: 'error',
          placement: 'top',
          duration: 3000,
        });
      }
    }
  };

  useEffect(() => {
    if (transactionReducer.details) {
      const {payment} = transactionReducer.details;
      if (Number(payment)) {
        navigation.navigate(PAYMENT_STACK, {
          screen: PAYMENT_DETAIL,
        });
      } else {
        navigation.navigate(PAYMENT_STACK, {
          screen: FINISH_PAYMENT,
        });
      }
      // navigation.navigate(PAYMENT_DETAIL);
    }
  }, [transactionReducer]);

  const seeDetails = id => {
    dispatch(getTransactionDetail(id, token));
    // console.log(PAYMENT_DETAIL);
    // navigation.navigate(PAYMENT_STACK, {
    //   screen: PAYMENT_DETAIL,
    // });
  };

  return (
    <>
      {trxLoading && <LoadingScreen />}
      <Box w="full" px="5" pt="5" pb="12" flex={1}>
        <Box>
          <Text
            fontFamily={fontStyle(fontFamily.primary, 'bold')}
            textAlign="center"
            fontSize="3xl">
            History Order
          </Text>
        </Box>
        <Box justifyContent="center" minHeight="3/5" mt="12">
          {!histories.length && (
            <Text
              textAlign="center"
              color="gray.400"
              fontFamily={fontStyle(fontFamily.primary, 'bold')}
              fontSize="2xl">
              No history order
            </Text>
          )}
          {histories.length && (
            <FlatList
              data={histories}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <Pressable onPress={() => seeDetails(item.id)}>
                  <Box mb="3" py="3" rounded="2xl">
                    <HistoryItem
                      type={item.type}
                      name={item.name}
                      image={item.image}
                      startRent={item.start_rent}
                      endRent={item.end_rent}
                      prepayment={item.prepayment}
                      paymentStatus={item.payment}
                      returnStatus={item.returned}
                    />
                  </Box>
                </Pressable>
              )}
            />
          )}
        </Box>
      </Box>
    </>
  );
}
