import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
// contants
import {googleIcon} from '../contants/icons';
import {symbols} from '../contants/symbols';

const windowWidth = Dimensions.get('window').width;

const ProductCard = ({
  change_amount,
  change_percentage,
  ticker,
  type,
  onNavigate,
}) => {
  const loser = type === 'loser' ? true : false;
  return (
    <TouchableOpacity onPress={() => onNavigate(ticker)} style={styles.root}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.img}
          source={symbols[ticker]?.logo || googleIcon}
        />
      </View>
      <Text style={styles.companyName}>{ticker}</Text>
      <View style={styles.valuesContainer}>
        <Text style={styles.amount}>${change_amount}</Text>
        <Text style={[styles.percentage, {color: loser ? 'red' : 'green'}]}>
          +{change_percentage}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  root: {
    width: windowWidth / 2 - 20,
    height: 200,
    margin: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'lightgrey',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  companyName: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: 'red',
    marginTop: 20,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valuesContainer: {
    paddingBottom: 10,
  },
  percentage: {
    fontSize: 14,
    color: 'green',
  },
  amount: {
    fontSize: 15,
    fontWeight: '600',
  },
  img: {
    width: '100%',
    objectFit: 'contain',
  },
});
