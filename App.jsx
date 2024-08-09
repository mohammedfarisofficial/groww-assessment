// navigation
import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './src/navigations/RootNavigation';
//redux
import {Provider} from 'react-redux';
import {store} from './src/state/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
