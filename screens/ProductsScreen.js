import { useEffect, useState, useContext } from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from '../context/ThemeContext';

const ProductsScreen = ({route}) => {
  const {category} = route.params;
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [addItems, setAddItems] = useState([]);
  const {isDark} = useContext(ThemeContext);

  const productsCategory = {
    Lanches: [
      {id: '1', title: 'Hambúrguer', price: 41} ,
      {id: '2', title: 'Xis', price: 35} ,
      {id: '3', title: 'Cachorro quente', price: 28} ,
      ],
    Bebidas: [
      {id: '4', title: 'Água', price: 5} ,
      {id: '5', title: 'Refrigerante', price: 6} ,
      {id: '6', title: 'Cerveja', price: 7} ,
      ],
    Sobremesas: [
      {id: '7', title: 'Sorvete', price: 21} ,
      {id: '8', title: 'Pudim', price: 23} ,
      {id: '9', title: 'Sagu', price: 22} ,
      ],
  };

  useEffect(() => {
    if(category.title){
      const list = productsCategory[category.title];
      setProducts(list);
    }
  }, [category]);

  useEffect(() => {
    const loadCart = async () => {
      try{
        const jsonValue = await AsyncStorage.getItem('cart');
        if(jsonValue){
        const savedCart = JSON.parse(jsonValue)
        setCart(savedCart);
        setAddItems(savedCart.map(product => product.id));
        } else {
          setCart([]);
          setAddItems([]);
        }
      } catch(e){
        console.log('Erro ao recuperar carrinho', e);
      }
    };
    loadCart();
  },[]);

  useEffect(() => {
    const saveCart = async() => {
      try{
        const jsonValue = JSON.stringify(cart);
        await AsyncStorage.setItem('cart', jsonValue)
      } catch(e){
        console.log('Erro ao salvar no carrinho', e);
      }
    }; saveCart();
  },[cart]);

  const addToCart = (item) => {
    const onCart = cart.find(prod => prod.id === item.id);
    if(onCart){
      setCart(cart.map(prod => 
        prod.id === item.id ? {...prod, quantity: prod.quantity +1} : prod
      ));
    } else {
      setCart([...cart, {...item, quantity: 1}]);
    }
    if(!addItems.includes(item.id)){
      setAddItems([...addItems, item.id]);
    }
  };

  const deleteProduct = (id) => {
    let newCart = cart.map(prod => prod.id === id ? {...prod, quantity: prod.quantity -1} : prod);
    newCart = newCart.filter(prod => prod.quantity > 0);
    setCart(newCart);
    if(!newCart.find(prod => prod.id === id)){
      setAddItems(newAdd => newAdd.filter(itemId => itemId !== id ));
    }
  }

  const total = cart.reduce((sum, prod) => sum + prod.price * prod.quantity, 0);

  const backgroundColorContainer = isDark ? '#403F3F' : '#B4CCC4';
  const backgroundColorCard = isDark ? '#82807E' : '#CEEDE2';
  const colorText = isDark ? 'white' : 'black';
  const borderColorTheme = isDark ?  'white' : 'black';

  return(
    <View style={[styles.container, {backgroundColor: backgroundColorContainer}]}>
      <Text style={[styles.label, {color: colorText}]}>Produtos de {category.title}</Text>
      <FlatList
      data={products} 
      keyExtractor={item => item.id} 
      renderItem={({item}) => (
      <View style={[styles.card, {backgroundColor: backgroundColorCard, borderColor: borderColorTheme}]}>
        <Text style={[styles.cardText, {color: addItems.includes(item.id) ? "blue" : isDark ? "white" : "black"},]}>{item.title} - Preço R$ {item.price}</Text>
        <TouchableOpacity style={[styles.cardInput, {borderColor: borderColorTheme, backgroundColor: backgroundColorCard}]} onPress={() => addToCart(item)}>
          <Text style={[styles.cardTextInput, {color: colorText}]}>Adicionar ao carrinho</Text>
        </TouchableOpacity>
      </View>  
      )}
      />
      <ScrollView style={[styles.cartCard, {borderColor: borderColorTheme, backgroundColor: backgroundColorCard}]}>
        <Text style={[styles.label, {color: colorText}]}>Carrinho</Text>
        {cart.length === 0 ? <Text style={[styles.cardText, {color: colorText}]}>Nenhum item adicionado ao carrinho</Text> : cart.map(prod => (
          <View key={prod.id}> 
            <Text style={[styles.cartTextProduct, {color: colorText}]}> {prod.title} x {prod.quantity} = R$ {prod.price * prod.quantity} </Text>
            <TouchableOpacity onPress={() => deleteProduct(prod.id)}>
              <Text style={styles.deleteProduct}>Remover</Text>
            </TouchableOpacity>
          </View>
        ))}
        <Text style={[styles.cardTotal, {color: colorText}]}>Total: R$ {total} </Text>
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 16},
  label: {fontSize: 20, textAlign: 'center', margin: 30},
  card:{borderWidth: 1,padding: 10, borderRadius: 8, margin: 10,},
  cardText: {textAlign: 'center', fontSize: 18, marginBottom: 20},
  cardInput: {borderWidth: 1, padding: 10, borderRadius: 8, marginLeft: 50, marginRight: 50},
  cardTextInput: {textAlign: 'center', fontSize: 18},
  cartCard: {minHeight: Dimensions.get('window').height * 0.3, maxHeight: Dimensions.get('window').height * 0.3, borderWidth: 1, borderRadius: 8, margin: 10, marginBottom: 30},
  cartTextProduct: {textAlign: 'center', fontSize: 18, marginBottom: 10},
  deleteProduct: {color: 'red', fontSize: 14, textAlign: 'center', marginBottom: 10},
  cardTotal: {textAlign: 'center', fontSize: 20, marginBottom: 20},
});

export default ProductsScreen;


