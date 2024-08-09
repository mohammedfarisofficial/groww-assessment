import {Image, StyleSheet, Text, View} from 'react-native';
//constants
import {googleIcon} from '../contants/icons';

const DetailsHeader = ({header = 'Header', logo = googleIcon}) => {
  return (
    <View style={styles.root}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          //   backgroundColor:"red"
        }}>
        <View style={styles.logoContainer}>
          <Image style={styles.img} source={logo} />
        </View>
        <View>
          <Text>APPLE INC</Text>
          <Text>APPLE INC</Text>
          <Text>SNQ</Text>
        </View>
      </View>
      <View style={styles.valuesContainer}>
        <Text style={styles.amount}>$199.11</Text>
        <Text style={styles.percentage}>+0.45%</Text>
      </View>
    </View>
  );
};

export default DetailsHeader;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 70,
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // justifyContent:'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderColor: 'red',
    // backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    color: 'black',
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
