import AsyncStorage from '@react-native-async-storage/async-storage';

export const authUser = async (username, password) => {
  return new Promise((resolve, reject) =>{
    setTimeout(async () => {
        if(username !== '' && password !== ''){
          const user = {
            name:"Thiago Nogueira", 
            email: "thiago.nog@hotmail.com",
          };
          try{
            const jsonValue = JSON.stringify(user);
            await AsyncStorage.setItem('userObject', jsonValue);
          } catch(e){
            console.log('Erro ao salvar', e);
          }
          resolve({success: true, ...user});
        } else{
          reject({success: false, message: 'Usuário ou senha inválidos!'})
        }
    }, 200)
  });
};