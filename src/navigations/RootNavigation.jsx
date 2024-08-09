import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import GainStackNavigation from './GainStackNavigation';
import LoserStackNavigation from './LoserStackNavigation';

const Tab = createBottomTabNavigator();

const RootNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarIconStyle: {display: 'none'},
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: 'black',
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Top Gainers',
          tabBarLabelStyle: {
            fontWeight: '700',
            fontSize: 15,
            width: '100%',
            textAlign: 'center',
          },
        }}
        name="top-gainers"
        component={GainStackNavigation}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Top Losers',
          tabBarLabelStyle: {
            fontWeight: '700',
            fontSize: 15,
          },
        }}
        name="top-losers"
        component={LoserStackNavigation}
      />
    </Tab.Navigator>
  );
};

export default RootNavigation;
