import { useEffect, useState, useContext} from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from '../context/ThemeContext';
import * as Notifications from 'expo-notifications';

const CheckoutScreen = () =>{
  const [cart, setCart] = useState([]);
  const [adress, setAdress] = useState("");
  const [payment, setPayment] = useState("");
  const [message, setMessage] = useState('');
  const {isDark} = useContext(ThemeContext);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  const loadCart = async () => {
    try{
      const jsonValue = await AsyncStorage.getItem('cart');
      if(jsonValue){
        setCart(JSON.parse(jsonValue));
      } else {
        setCart([]);
      }
    } catch(e){
      console.log('Erro ao recuperar carrinho', e);
    }
  };

 useEffect(() => {
  loadCart();
  },[]);

 const total = cart.reduce((sum, prod) => sum + prod.price * prod.quantity, 0);

  const handleClick = async () => {
    if(!adress.trim()){
      setMessage("Prencha o campo de endereço");
      return;
    }
    if(!payment.trim()){
      setMessage("Prencha o campo de método de pagamento");
      return;
    } 
    Alert.alert("Checkout realizado com sucesso")
    Notifications.scheduleNotificationAsync({
      content: {
      title: 'Pedido confirmado',
      body: "Sua comida está sendo preparada",
      },
        trigger: null,
    });
    await AsyncStorage.removeItem("cart");
    setCart([]);
    setAdress("");
    setPayment("");
    setMessage("");
  };

  const backgroundColorContainer = isDark ? '#403F3F' : '#B4CCC4';
  const backgroundColorCard = isDark ? '#82807E' : '#CEEDE2';
  const colorText = isDark ? 'white' : 'black';
  const borderColorTheme = isDark ?  'white' : 'black';

  return(
    <View style={[styles.container, {backgroundColor: backgroundColorContainer}]}>
      <Text style={[styles.label, {color: colorText}]}>Revisão dos Pedidos</Text>
      <FlatList 
      data={cart} 
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
    <TextInput style={[styles.card, {borderColor: borderColorTheme, backgroundColor: backgroundColorCard}]} placeholder="Endereço de entrega" value={adress} onChangeText={setAdress}/>
    <TextInput style={[styles.card, {borderColor: borderColorTheme, backgroundColor: backgroundColorCard}]} placeholder="Método de pagamento" value={payment} onChangeText={setPayment}/>
    <TouchableOpacity style={[styles.card, {borderColor: borderColorTheme, backgroundColor: backgroundColorCard}]} onPress={handleClick}>
      <Text style={[styles.cardText, {color: colorText}]}>Confirmar pedido</Text>
    </TouchableOpacity>
    {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 16},
  label: {fontSize: 20, textAlign: 'center', margin: 30},
  card:{borderWidth: 1,padding: 10, borderRadius: 8, margin: 10,},
  cardText: {textAlign: 'center', fontSize: 18, marginBottom: 10},
  message: {color: 'red', fontSize: 14, textAlign: 'center', marginTop: 16},
});

export default CheckoutScreen;


