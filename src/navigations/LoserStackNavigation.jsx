import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProductScreen from '../screens/ProductScreen';
import TopLosers from '../screens/TopLosers';

const Stack = createNativeStackNavigator();

const LoserStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="loser-explore" component={TopLosers} />
      <Stack.Screen name="loser-details" component={ProductScreen} />
    </Stack.Navigator>
  );
};

export default LoserStackNavigation
