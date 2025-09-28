import {useState, useContext} from 'react';
import { Text, StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import {authUser} from '../api/authUser';
import { ThemeContext } from '../context/ThemeContext';

const LoginScreen = ({navigation}) =>{
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const {isDark} = useContext(ThemeContext);

  const handleLogin = async() =>{
    setMessage('');
    try{
      await authUser(user, password);
      navigation.navigate('Home');
    } catch(error){
      setMessage(error.message);
    }
  };

  const backgroundColorContainer = isDark ? '#403F3F' : '#B4CCC4';
  const backgroundColorCard = isDark ? '#82807E' : '#CEEDE2';
  const colorText = isDark ? 'white' : 'black';
  const borderColorTheme = isDark ?  'white' : 'black';

  return(
    <View style={[styles.container, {backgroundColor: backgroundColorContainer}]}>
      <Text style={[styles.labelContainer, {color: colorText}]}>InfnetFood</Text>

      <View style={styles.containerFlex}>
        <Text style={[styles.label, {color: colorText}]}>Login:</Text>
        <TextInput 
          style={[styles.input, {backgroundColor: backgroundColorCard, borderColor: borderColorTheme }]}
          placeholder='Usuário'
          value={user}
          onChangeText={setUser} 
          autoCapitalize='none'
        />
          <Text style={[styles.label, {color: colorText}]}>Senha:</Text>
        <TextInput 
          style={[styles.input, {backgroundColor: backgroundColorCard, borderColor: borderColorTheme }]}
          placeholder='Senha'
          value={password}
          onChangeText={setPassword} 
          secureTextEntry
          autoCapitalize='none'
        />
        <TouchableOpacity style={[styles.buttonInput, {backgroundColor: backgroundColorCard, borderColor: borderColorTheme }]} onPress={handleLogin}>
          <Text style={[styles.buttonText, {color: colorText}]}>Entrar</Text>
        </TouchableOpacity>
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20},
  containerFlex: {flex: 1, justifyContent: 'center'},
  labelContainer: {fontSize: 30, margin: 'auto', marginTop: 100},
  label: {fontSize: 20, marginBottom: 8},
  input: {borderWidth: 1, padding: 15, borderRadius: 8,marginBottom: 30 },
  message: {color: 'red', fontSize: 14, textAlign: 'center', marginTop: 16},
  buttonInput:{borderWidth: 1, padding: 15, borderRadius: 8,marginTop: 30},
  buttonText: {textAlign: 'center', fontSize: 20}
});

export default LoginScreen;