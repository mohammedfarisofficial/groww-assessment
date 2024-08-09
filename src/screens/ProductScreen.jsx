import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import {LineChart} from 'react-native-chart-kit';
import Header from '../components/Header';
import DetailsHeader from '../components/DetailsHeader';
import Badge from '../components/Badge';
// redux
import {setSelectedCompany} from '../state/reducers/stockSlice';
// contants 
import {symbols} from '../contants/symbols';
// local API
import {selected_company as selected_company_local} from '../contants/demoApi';

const ProductScreen = ({route}) => {
  const {symbol} = route.params;
  const {selected_company} = useSelector(state => state.stock);

  const dispatch = useDispatch();

  const fetchData = async () => {
    // await AsyncStorage.clear();
    // return
    const cache = await AsyncStorage.getItem('selected-company');
    if (cache) {
      console.log('From cache...');
      const {graphData, companyOverview} = JSON.parse(cache);
      dispatch(setSelectedCompany({graphData, companyOverview}));
    } else {
      const overviewResponse = await axios.get(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${process.env.ALPHA_CLIENT_API_KEY}`,
      );
      const weeklyResponse = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${process.env.ALPHA_CLIENT_API_KEY}`,
      );

      const graphData = weeklyResponse.data;
      const companyOverview = overviewResponse.data;

      if (
        weeklyResponse.status === 200 &&
        overviewResponse.status === 200 &&
        weeklyResponse.data != '' &&
        companyOverview.data != ''
      ) {
        console.log('From server...');

        const selected_company = {graphData, companyOverview};

        if (graphData && companyOverview) {
          dispatch(setSelectedCompany(selected_company));
          await AsyncStorage.setItem(
            'selected-company',
            JSON.stringify(selected_company),
          );
        }
      } else {
        console.log('From local...');

        if (selected_company_local) {
          dispatch(setSelectedCompany(selected_company_local));
          await AsyncStorage.setItem(
            'selected-company',
            JSON.stringify(selected_company_local),
          );
        }
      }
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (selected_company === null) {
    return (
      <View style={styles.root}>
        <Header header="Product Details" />
        <ActivityIndicator />
      </View>
    );
  } else {
    const {graphData, companyOverview} = selected_company;

    const flattenWeeklyData = Object.keys(graphData['Weekly Time Series']).map(
      date => {
        const weeklyInfo = graphData['Weekly Time Series'][date];
        return {
          date: date,
          close: parseFloat(weeklyInfo['4. close']),
          volume: parseInt(weeklyInfo['5. volume'], 10),
        };
      },
    );
    const closePrices = flattenWeeklyData.map(item => item.close);

    return (
      <ScrollView style={styles.root}>
        <Header header="Product Details" />
        <DetailsHeader logo={symbols[symbol]?.logo} />
        {selected_company === null ? (
          <View>
            <ActivityIndicator />
          </View>
        ) : (
          <>
            <LineChart
              data={{
                datasets: [
                  {
                    data: closePrices,
                    strokeWidth: 1,
                  },
                ],
              }}
              width={Dimensions.get('window').width - 16}
              height={220}
              chartConfig={{
                backgroundColor: 'white',
                backgroundGradientFrom: 'white',
                backgroundGradientTo: 'white',
                propsForDots: {r: '0', strokeWidth: '0', stroke: '#000000'},
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForBackgroundLines: {
                  strokeDasharray: '',
                  stroke: '#e3e3e3',
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
            <View style={styles.contentSection}>
              <Text style={styles.contentHeader}>
                About {companyOverview.Name}
              </Text>
              <Text style={styles.contentDesc}>
                {companyOverview.Description}
              </Text>
              <ScrollView
                showsHorizontalScrollIndicator={false}
                horizontal
                style={styles.badgeSection}>
                <Badge>Industry : Electronic computers</Badge>
                <Badge>Industry : Electronic computers</Badge>
              </ScrollView>
              <View style={styles.bottomContainer}>
                <View style={styles.bottomInner}>
                  <Text>Market Cap</Text>
                  <Text>${companyOverview.MarketCapitalization}</Text>
                </View>
                <View style={styles.bottomInner}>
                  <Text>P/E Ratio</Text>
                  <Text>${companyOverview.PERatio}</Text>
                </View>
                <View style={styles.bottomInner}>
                  <Text>Beta</Text>
                  <Text>${companyOverview.Beta}</Text>
                </View>
                <View style={styles.bottomInner}>
                  <Text>Dividend Yield</Text>
                  <Text>$2.77T</Text>
                </View>
                <View style={styles.bottomInner}>
                  <Text>Profit Margin</Text>
                  <Text>${companyOverview.ProfitMargin}</Text>
                </View>
                <View style={styles.bottomInner}>
                  <Text>RevenueTTM</Text>
                  <Text>${companyOverview.RevenueTTM}</Text>
                </View>
                <View style={styles.bottomInner}>
                  <Text>RevenueTTM</Text>
                  <Text>${companyOverview.RevenueTTM}</Text>
                </View>
                <View style={styles.bottomInner}>
                  <Text>RevenueTTM</Text>
                  <Text>${companyOverview.RevenueTTM}</Text>
                </View>
                <View style={styles.bottomInner}>
                  <Text>RevenueTTM</Text>
                  <Text>${companyOverview.RevenueTTM}</Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    );
  }
};

export default ProductScreen;

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
  },
  contentSection: {
    paddingHorizontal: 20,
  },
  contentHeader: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
  },
  contentDesc: {
    marginVertical: 5,
    color: 'grey',
    lineHeight: 20,
  },
  badgeSection: {
    flexDirection: 'row',
  },
  bottomContainer: {
    width: '100%',
    height: 100,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 10,
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  bottomInner: {
    // backgroundColor: 'red',
    padding: 10,
    marginBottom: 5,
  },
});
