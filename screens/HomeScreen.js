import { useContext} from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const HomeScreen = ({navigation}) =>{
  const {isDark} = useContext(ThemeContext);
  const categories = [
    {id: '1', title: 'Lanches'} ,
    {id: '2', title: 'Bebidas'} ,
    {id: '3', title: 'Sobremesas'} ,
  ];

  const backgroundColorContainer = isDark ? '#403F3F' : '#B4CCC4';
  const backgroundColorCard = isDark ? '#82807E' : '#CEEDE2';
  const colorText = isDark ? 'white' : 'black';
  const borderColorTheme = isDark ?  'white' : 'black';

  return(
    <View style={[styles.container, {backgroundColor: backgroundColorContainer}]}>
      <Text style={[styles.label, {color: colorText}]}>Lista de Categorias</Text>
      <FlatList 
      data={categories} 
      keyExtractor={item => item.id} 
      renderItem={({item}) => (
      <TouchableOpacity 
      style={[styles.buttonInput, {borderColor: borderColorTheme, backgroundColor: backgroundColorCard}]} 
      onPress={() => navigation.navigate('Products', {category: item})}>
        <Text style={[styles.buttonText, {color: colorText}]}>{item.title}</Text>
      </TouchableOpacity>
      )}
    />
    <TouchableOpacity style={[styles.buttonInput, {backgroundColor: backgroundColorCard, borderColor: borderColorTheme}]} onPress={() => navigation.navigate('Config')} >
        <Text style={[styles.buttonText, {color: colorText}]}>Configurações</Text> 
    </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', padding: 16, backgroundColor: '#B4CCC4'},
  label: {fontSize: 24, textAlign: 'center', margin: 30},
  buttonInput:{borderWidth: 1, padding: 15, borderRadius: 8, marginBottom: 30},
  buttonText: {textAlign: 'center', fontSize: 18},
});

export default HomeScreen;


