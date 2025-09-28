import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { useContext} from 'react';

const DetailScreen = ({route}) => {
  const {isDark} = useContext(ThemeContext);
  const {restaurant} = route.params

  const backgroundColorContainer = isDark ? '#403F3F' : '#B4CCC4';
  const backgroundColorCard = isDark ? '#82807E' : '#CEEDE2';
  const colorText = isDark ? 'white' : 'black';
  const borderColorTheme = isDark ?  'white' : 'black';

  return(
    <>
    <View style={[styles.container, {backgroundColor: backgroundColorContainer}]}>
      <View style={[styles.card, {borderColor: borderColorTheme, backgroundColor: backgroundColorCard}]}>
        <Text style={[styles.cardText, {color: colorText}]}>Nome do Restaurante: {restaurant.name}</Text>
        <Text style={[styles.cardText, {color: colorText}]}>Endereço: {restaurant.adress}</Text>
        <Text style={[styles.cardText, {color: colorText}]}>Exemplo de item do cardápio: {restaurant.menu}</Text>
      </View> 
    </View>
    </>
  )
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 16},
  card:{borderWidth: 1, padding: 10, borderRadius: 8, margin: 10,},
  cardText: {textAlign: 'center', fontSize: 18, margin: 10, padding: 20},
});

export default DetailScreen;