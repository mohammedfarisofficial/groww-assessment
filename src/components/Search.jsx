import {View, TextInput, StyleSheet} from 'react-native';

const Search = () => {
  return (
    <View style={styles.searchContainer}>
      <TextInput style={styles.input} placeholder="Search..." />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  searchContainer: {
    width: 170,
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'lightgrey',
    paddingLeft: 10,
  },
});
