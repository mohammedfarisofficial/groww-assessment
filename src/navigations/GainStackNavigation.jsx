import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TopGainers from '../screens/TopGainers';
import ProductScreen from '../screens/ProductScreen';

const Stack = createNativeStackNavigator();

const GainStackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="gain-explore" component={TopGainers} />
      <Stack.Screen name="gain-details" component={ProductScreen} />
    </Stack.Navigator>
  );
};

export default GainStackNavigation;
