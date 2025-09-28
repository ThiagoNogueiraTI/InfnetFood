import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import ProductsScreen from './screens/ProductsScreen';
import TabsScreen from './screens/TabsScreen';
import DetailScreen from './screens/DetailScreen';
import ConfigScreem from './screens/ConfigScreen';
import {ThemeProvider} from './context/ThemeContext';

const StackNav = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <StackNav.Navigator initialRouteName='Login'>
          <StackNav.Screen name='Login' component={LoginScreen} />
          <StackNav.Screen name='Home' component={TabsScreen} />
          <StackNav.Screen name='Products' component={ProductsScreen} />
          <StackNav.Screen name='Detail' component={DetailScreen} />
          <StackNav.Screen name='Config' component={ConfigScreem} />
        </StackNav.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  )
};

