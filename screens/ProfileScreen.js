import {useEffect, useState, useContext} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../context/ThemeContext';

const ProfileScreen = () => {
  const [user, setUser] = useState({name: "", email: ""});
  const {isDark} = useContext(ThemeContext);

  useEffect(() => {
  const loadUser = async () => {
    try{
    const jsonValue = await AsyncStorage.getItem('userObject');
    if(jsonValue){
      setUser(JSON.parse(jsonValue));
    }
    } catch(e){
      console.log("Erro ao recuperar informações", e);
    }
  };
  loadUser();
  },[]);

  const backgroundColorContainer = isDark ? '#403F3F' : '#B4CCC4';
  const backgroundColorCard = isDark ? '#82807E' : '#CEEDE2';
  const colorText = isDark ? 'white' : 'black';
  const borderColorTheme = isDark ?  'white' : 'black';

  return(
    <View style={[styles.container, {backgroundColor: backgroundColorContainer}]}>
      <Text style={[styles.label, {color: colorText}]}>Tela de Perfil</Text>
      <Text style={[styles.labelUser, {backgroundColor: backgroundColorCard, borderColor: borderColorTheme, color: colorText}]}>Nome: {user.name}</Text>
      <Text style={[styles.labelUser, {backgroundColor: backgroundColorCard, borderColor: borderColorTheme, color: colorText}]}>Email: {user.email}</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {flex: 1,alignItems: 'center', padding: 16, backgroundColor: '#B4CCC4'},
  label: {fontSize: 20, textAlign: 'center', margin: 30, marginBottom: 200},
  labelUser: {fontSize: 20, textAlign: 'center', margin: 30, borderWidth: 1, padding: 10, borderRadius: 8, margin: 10},
});

export default ProfileScreen;


