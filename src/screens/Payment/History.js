import {} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Box, FlatList, Pressable, Text, useToast, Button} from 'native-base';
import {fontFamily, fontStyle} from '../../helpers/styleConstants';
import {axiosInstance} from '../../helpers/http';
import {useDispatch, useSelector} from 'react-redux';
import HistoryItem from '../../components/HistoryItem';
import {
  clearTransactionError,
  getTransactionDetail,
} from '../../redux/actions/transactionActions';
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

  const [doRefresh, setDoRefresh] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (trxError) {
      dispatch(clearTransactionError());
    }
  }, []);

  useEffect(() => {
    if (authReducer.user && doRefresh) {
      getHistories();
    }

    if (doRefresh) {
      // getHistories();
      setDoRefresh(false);
    }
  }, [authReducer, doRefresh]);

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
      setIsLoading(true);

      const {data} = await axiosInstance(token).get(
        '/histories?limit=10&created=desc',
      );

      if (!data.success) {
        toast.show({
          description: data.message,
          duration: 3000,
          position: 'top',
          status: 'error',
        });
        setIsLoading(false);
        return;
      }

      console.log(data);

      setHistories(data.results);
      setPageInfo(data.pageInfo);

      setIsLoading(false);
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

      setIsLoading(false);
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

  const loadMore = async () => {
    try {
      setIsLoading(true);

      const endpoint = pageInfo?.nextPage.split('?')[1];

      console.log(endpoint);

      const {data} = await axiosInstance(token).get(`/histories?${endpoint}`);

      if (!data.success) {
        toast.show({
          render: () => (
            <Box bg="error.500" px="2" py="1" rounded="sm" mb={5}>
              {data.message}
            </Box>
          ),
        });

        setIsLoading(false);
        return;
      }

      setHistories([...histories, ...data.results]);

      setIsLoading(false);
    } catch (err) {
      if (err.response) {
        console.error(err.response);
        const id = err.response.data.message;
        if (!toast.isActive(id)) {
          toast.show({
            render: () => (
              <Box bg="error.500" px="2" py="1" rounded="sm" mb={5}>
                {err.response.data.message}
              </Box>
            ),
          });
        }
      } else {
        console.error(err);
        const id = err.message;
        if (!toast.isActive(id)) {
          toast.show({
            render: () => (
              <Box bg="error.500" px="2" py="1" rounded="sm" mb={5}>
                {err.response.data.message}
              </Box>
            ),
          });
        }
      }
      setIsLoading(false);
    }
  };

  return (
    <>
      {(trxLoading || isLoading) && <LoadingScreen />}
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
          {/* {histories.length && ( */}
          <FlatList
            data={histories}
            onRefresh={() => setDoRefresh(true)}
            refreshing={doRefresh}
            ListFooterComponent={() => (
              <>
                {pageInfo.nextPage && (
                  <Box px="5" mb="5">
                    <Button bgColor="warning.500" onPress={loadMore}>
                      <Text
                        fontFamily={fontStyle(fontFamily.primary, 'bold')}
                        color="white">
                        Load More
                      </Text>
                    </Button>
                  </Box>
                )}
              </>
            )}
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
          {/* )} */}
        </Box>
      </Box>
    </>
  );
}
