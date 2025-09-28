import { useEffect, useState, useContext} from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from '../context/ThemeContext';

const OrdersScreen = () =>{
const [orders, setOrders] = useState([]);
const {isDark} = useContext(ThemeContext);

  const loadCart = async () => {
    try{
      const jsonValue = await AsyncStorage.getItem('cart');
      if(jsonValue){
      setOrders(JSON.parse(jsonValue));
      } else {
        setOrders([]);
      }
    } catch(e){
      console.log('Erro ao recuperar carrinho', e);
    }
  };

 useEffect(() => {
    loadCart();
  },[]);

 const total = orders.reduce((sum, prod) => sum + prod.price * prod.quantity, 0);

  const backgroundColorContainer = isDark ? '#403F3F' : '#B4CCC4';
  const backgroundColorCard = isDark ? '#82807E' : '#CEEDE2';
  const colorText = isDark ? 'white' : 'black';
  const borderColorTheme = isDark ?  'white' : 'black';

  return(
    <View style={[styles.container, {backgroundColor: backgroundColorContainer}]}>
      <Text style={[styles.label, {color: colorText}]}>Pedidos atuais</Text>
      <FlatList 
      data={orders} 
      keyExtractor={item => item.id} 
      renderItem={({item}) => (
        <View style={[styles.card, {borderColor: borderColorTheme, backgroundColor: backgroundColorCard}]}>
          <Text style={[styles.cardText, {color: colorText}]}>{item.title} - Preço R$ {item.price}</Text>
          <Text style={[styles.cardText, {color: colorText}]}>Quantidade: {item.quantity}</Text>
        </View>
        )}
      />
      <Text style={[styles.label, {color: colorText}]}>Total: R$ {total} </Text>
      <TouchableOpacity style={[styles.card, {borderColor: borderColorTheme, backgroundColor: backgroundColorCard}]} onPress={loadCart}>
        <Text style={[styles.cardText, {color: colorText}]}>Atualizar pedidos</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 16},
  label: {fontSize: 20, textAlign: 'center', margin: 30},
  card:{borderWidth: 1,padding: 10, borderRadius: 8, margin: 10,},
  cardText: {textAlign: 'center', fontSize: 18, marginBottom: 10},
});

export default OrdersScreen;


