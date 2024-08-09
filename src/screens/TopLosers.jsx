import {View, Text, FlatList, StyleSheet} from 'react-native';

import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

// import {top_losers} from '../dummyData/data';
//redux
import {useSelector} from 'react-redux';

const TopLosers = ({navigation}) => {
  const {top_losers} = useSelector(state => state.stock);

  const navigateCompanyOverview = symbol => {
    navigation.push('loser-details', {symbol});
  };

  return (
    <View>
      <Header header="Stock App" />
      {top_losers && top_losers.length ? (
        <FlatList
          contentContainerStyle={styles.listContainer}
          data={top_losers}
          numColumns={2}
          renderItem={({item: gainer}) => (
            <ProductCard
              type="loser"
              onNavigate={navigateCompanyOverview}
              {...gainer}
            />
          )}
        />
      ) : (
        <Text>No Top Gainers</Text>
      )}
    </View>
  );
};

export default TopLosers;

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
