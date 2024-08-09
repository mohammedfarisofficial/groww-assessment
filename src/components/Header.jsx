import {StyleSheet, Text, View} from 'react-native';
import Search from './Search';

const Header = ({header = 'Header'}) => {
  return (
    <View style={styles.root}>
      <Text style={styles.header}>{header}</Text>
      <Search />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
});
