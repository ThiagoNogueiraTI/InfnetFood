import { useContext} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

const ConfigScreem = () =>{
  const {isDark, toggleTheme} = useContext(ThemeContext);

  const backgroundColorContainer = isDark ? '#403F3F' : '#B4CCC4';
  const backgroundColorCard = isDark ? '#82807E' : '#CEEDE2';
  const colorText = isDark ? 'white' : 'black';
  const borderColorTheme = isDark ?  'white' : 'black';

  return(
    <View style={[styles.container, {backgroundColor: backgroundColorContainer}]}>
      <Text style={[styles.label, {color: colorText}]}>Tela de Configuração</Text>
      <TouchableOpacity style={[styles.card, {backgroundColor: backgroundColorCard, borderColor: borderColorTheme }]} onPress={toggleTheme}>
        <Text style={[styles.cardText, {color: colorText}]}>Alterar tema</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {flex: 1,alignItems: 'center',padding: 16},
  label: {fontSize: 20, textAlign: 'center', margin: 30, marginBottom: 200},
  card:{borderWidth: 1, padding: 10, borderRadius: 8, margin: 10},
  cardText: {textAlign: 'center', fontSize: 18, marginBottom: 10},
});

export default ConfigScreem;


