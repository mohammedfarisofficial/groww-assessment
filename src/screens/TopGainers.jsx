import {View, Text, FlatList, StyleSheet} from 'react-native';
import {useEffect} from 'react';
import axios from 'axios';
//redux
import {useDispatch, useSelector} from 'react-redux';
import {setTopGainerAndLosers} from '../state/reducers/stockSlice';
// for cache
import AsyncStorage from '@react-native-async-storage/async-storage';
// dummy data
import {response as localResponse} from '../contants/demoApi';

import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

const TopGainers = ({navigation}) => {
  const {top_gainers: topGainers} = useSelector(state => state.stock);

  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      // await AsyncStorage.clear();
      // return
      const cache = await AsyncStorage.getItem('top-gainers-losers');
      if (cache) {
        console.log('From cache...');

        const {top_gainers, top_losers} = JSON.parse(cache);
        dispatch(setTopGainerAndLosers({top_gainers, top_losers}));
      } else {
        const response = await axios.get(
          `https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=${process.env.ALPHA_CLIENT_API_KEY}`,
        );
        const {top_gainers, top_losers} = response.data;
        if (response.status === 200 && response.data != '') {
          console.log('From server...');

          const topData = {top_gainers, top_losers};
          if (top_gainers && top_losers) {
            dispatch(setTopGainerAndLosers({top_gainers, top_losers}));
            await AsyncStorage.setItem(
              'top-gainers-losers',
              JSON.stringify(topData),
            );
          }
        } else {
          console.log('From local...');

          if (localResponse) {
            const {top_gainers, top_losers} = localResponse;
            dispatch(setTopGainerAndLosers({top_gainers, top_losers}));
          }
        }
      }
    } catch (err) {
      console.log('error', err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigateCompanyOverview = symbol => {
    navigation.push('gain-details', {symbol});
  };

  return (
    <View style={styles.root}>
      <Header header="Stock App" />
      {topGainers && topGainers.length ? (
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={topGainers}
          numColumns={2}
          renderItem={({item: gainer}) => (
            <ProductCard onNavigate={navigateCompanyOverview} {...gainer} />
          )}
        />
      ) : (
        <Text>No Top Gainers</Text>
      )}
    </View>
  );
};

export default TopGainers;

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
  },
  listContainer: {
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
