import {} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Box, FlatList, Text, useToast} from 'native-base';
import {fontFamily, fontStyle} from '../../helpers/styleConstants';
import {axiosInstance} from '../../helpers/http';
import {useSelector} from 'react-redux';
import HistoryItem from '../../components/HistoryItem';

export default function History({navigation}) {
  const {authReducer} = useSelector(state => state);
  const {token} = authReducer.user;

  React.useLayoutEffect(() => {
    navigation.setOptions();
  }, [navigation]);

  const toast = useToast();
  const [histories, setHistories] = useState([]);
  const [pageInfo, setPageInfo] = useState({});

  useEffect(() => {
    if (authReducer.user) {
      getHistories();
    }
  }, [authReducer]);

  const getHistories = async () => {
    try {
      const {data} = await axiosInstance(token).get('/histories');

      if (!data.success) {
        toast.show({
          description: data.message,
          duration: 3000,
          position: 'top',
          status: 'error',
        });
        return;
      }

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

  return (
    <Box w="full" px="5" flex={1}>
      <Box mt="5" mb="12">
        <Text
          fontFamily={fontStyle(fontFamily.primary, 'bold')}
          textAlign="center"
          fontSize="3xl">
          History Order
        </Text>
      </Box>
      <Box justifyContent="center" minHeight="3/5">
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
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <Box mb="7">
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
            )}
          />
        )}
      </Box>
    </Box>
  );
}
