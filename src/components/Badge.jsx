import {StyleSheet, Text, View} from 'react-native';

const Badge = ({children}) => {
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.badgeText}>{children}</Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: 'lightgrey',
    margin: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 14,
  },
});
