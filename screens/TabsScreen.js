import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import OrdersScreen from './OrdersScreen';
import MapsScreen from './MapsScreen';
import CheckoutScreen from './CheckoutScreen';

const Tab = createBottomTabNavigator();

export default function ProfileTabs() {
  return(
     <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen}/>
      <Tab.Screen name="Perfil" component={ProfileScreen}/>
      <Tab.Screen name="Pedido" component={OrdersScreen}/>
      <Tab.Screen name="Mapa" component={MapsScreen}/>
      <Tab.Screen name="Checkout" component={CheckoutScreen}/>
    </Tab.Navigator>
  )
};