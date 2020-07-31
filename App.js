/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Prefixes from './src/screen/prefixes';
import Verbs from './src/screen/verbs';
import A2Verbs from './src/screen/a2_verbs';
import RunOut from './src/screen/run-out';

const Drawer = createDrawerNavigator();

const App = () => {
  console.disableYellowBox = true;

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Prefixes">
        <Drawer.Screen
          name="Prefixes"
          component={Prefixes}
          options={{title: 'Prefixes'}}
          initialParams={{source: 'prefixes'}}
        />
        <Drawer.Screen
          name="Verbs"
          component={Verbs}
          options={{title: 'Verbs'}}
          initialParams={{source: 'verbs'}}
        />
        <Drawer.Screen
          name="Verbs-a2"
          component={A2Verbs}
          options={{title: 'Verbs A2'}}
          initialParams={{source: 'a2_verbs'}}
        />
        <Drawer.Screen
          name="Run-out"
          component={RunOut}
          options={{title: 'Run out'}}
          initialParams={{source: 'run-out'}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};
export default App;
