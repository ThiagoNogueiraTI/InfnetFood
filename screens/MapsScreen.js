import {View, Text, StyleSheet, Dimensions} from 'react-native';
import MapView, {Marker, Callout}  from 'react-native-maps';
import { useContext} from 'react';
import { ThemeContext } from '../context/ThemeContext';

const MapsScreen = ({navigation}) => {
  const {isDark} = useContext(ThemeContext);

  const restaurants = [
    {id: 1, name:'Cachaçaria Mangue Seco', lat:-22.908261394766495, long: -43.18363313087435, adress: 'R. do Lavradio, 23 - Centro, Rio de Janeiro', menu:'Bacalheu Grelhado' },
    {id: 2, name:'Restaurante Santo Scenarium', lat:-22.908916483193035, long: -43.18350613126876, adress: 'R. do Lavradio, 36 - Centro, Rio de Janeiro', menu: 'Risoto de Cogumelo' },
    {id: 3, name:'Nova Esperança Bar e Restaurante', lat:-22.90905483948307, long: -43.18354904661038, adress: 'R. do Senado, 35 - Centro, Rio de Janeiro', menu: 'Feijoada Completa' },
    {id: 4, name:'Restaurante Lilia', lat:-22.909064722069818, long: -43.18403184420371, adress: 'R. do Senado, 45 - Centro, Rio de Janeiro', menu: 'Peixe do dia, alho poró tostado, beurre blanc, purê de castanha de caju e maça verde' },
    {id: 5, name:'Dos Santos Restaurante', lat:-22.910290157242898, long: -43.18310916435869, adress: 'R. do Lavradio, 96 - Lapa, Rio de Janeiro', menu: 'Sensação de Mignon' },
    {id: 6, name:'Contemporâneo Lapa', lat:-22.912108524505925, long: -43.18303406251084, adress: 'Av. Gomes Freire, 625 - loja c - Lapa', menu: 'Camarão do chef' },
    {id: 7, name:'Nova Capela Bar e Restaurante', lat:-22.912780523626143, long: -43.18234741704478, adress: 'Av. Mem de Sá, 96 - Lapa, Rio de Janeiro', menu: 'Costelinha Suína com arroz de brócolis e coradas' },
    {id: 8, name:'Restaurante Bar Brasil', lat:-22.912829935194676, long: -43.181875348286866, adress: 'Av. Mem de Sá, 90 - Lapa, Rio de Janeiro', menu: 'Kassler Defumado' },
    {id: 9, name:'Marizé Restaurante', lat:-22.9132845207801, long: -43.18264782443618, adress: 'Av. Gomes Freire, 755 - Lapa, Rio de Janeiro', menu: 'Filé de peixe empanado na Panko' },
    {id: 10, name:'Sabor Peruano en Rio', lat:-22.91368969360391, long: -43.180072903938467, adress: 'Sabor Peruano en rio - R. Joaquim Silva, 138 - Centro, Rio de Janeiro', menu: 'Tacu Tacu' },
  ];

  const backgroundColorContainer = isDark ? '#403F3F' : '#B4CCC4';
  const colorText = isDark ? 'white' : 'black';

  return(
    <View style={[styles.container, {backgroundColor: backgroundColorContainer}]}>
      <Text style={[styles.label, {color: colorText}]}>Restaurantes no Centro do Rio de Janeiro</Text>
      <MapView
          style={styles.map}
          initialRegion={{
            latitude: -22.91077439874083,
            longitude: -43.18277657050282,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
        {restaurants.map(restaurant => (
          <Marker
            key={restaurant.id}
            coordinate={{ latitude: restaurant.lat, longitude: restaurant.long }}>
            <Callout onPress={() => navigation.navigate('Detail', {restaurant: restaurant})}>
              <View>
                <Text>{restaurant.name}</Text>
                <Text>Toque para detalhes</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View> 
  )
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16},
  label: {fontSize: 18, textAlign: 'center', margin: 30},
  map: { width: Dimensions.get('window').width * 0.9, height: Dimensions.get('window').height * 0.5, marginBottom: 30},
});

export default MapsScreen;