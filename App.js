import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View , SafeAreaView, Image,TouchableOpacity, ImageBackground} from 'react-native';
import * as Location from 'expo-location';
import api from '././src/services/api'
import background from './src/assets/sky.png'

export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [weather,setWeather] = useState([{
    description: null,
    icon: null
  }])

  const [main,setMain] = useState([{
    temp: null,
    feels_like: null,
    temp_min: null,
    temp_max: null,
    humidity: null
  }])

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão negada');
      }

      let {coords} = await Location.getCurrentPositionAsync({});
      const {latitude, longitude} = coords;

      setLocation({
        latitude,
        longitude
      })

      const response = await api.get('weather',{
        params: {
          lat:latitude,
          lon: longitude,
          appid: ''
        }
      })
      setWeather(response.data.weather)
      setMain(response.data.main)
    })()
  },[]);

  async function reload(){
    let {coords} = await Location.getCurrentPositionAsync({});
      const {latitude, longitude} = coords;

      setLocation({
        latitude,
        longitude
      })

      const response = await api.get('weather',{
        params: {
          lat:latitude,
          lon: longitude,
          appid: '',
        }
      })
      setWeather(response.data.weather)
      setMain(response.data.main)
  }

  let text = ' Waiting ...'
  
  if (errorMsg){
    text = errorMsg
  } else if (location){
  
  };

  const getCurrentDate = ()=>{

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();

    return date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec
  }




  return (
    <SafeAreaView style={{ flex:1 }}>  
    <View style={styles.container}>
    <ImageBackground style={{width: '100%', height:'100%', opacity: 100}} source={background}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={{fontSize: 40}}>{(main.temp-273.15).toFixed(2)+'ºC'}</Text>
          <Text style={styles.dateTime}>{getCurrentDate()}</Text>
        </View>

        <View style={styles.header}>
          <Image style={styles.icon} source={{uri:`http://openweathermap.org/img/wn/${weather[0].icon}.png`}}/>
          <Text style ={{fontSize: 17, textTransform:'capitalize', fontWeight: 'bold'}}>{(weather[0].description)}</Text>
        </View>
      </View>

    <View style={styles.containerInformation}>
      

      <View style={styles.information}>
        <Text style={{fontSize: 16, fontWeight:'bold'}}>Temperatura Máxima</Text> 
        <Text style={{fontSize: 30, fontWeight:'bold'}}>{(main.temp_max-273.15).toFixed(2)+'ºC'}</Text>
      </View>

      <View style={styles.information}>
        <Text style={{fontSize: 16, fontWeight:"bold"}}>Temperatura Mínima</Text>  
        <Text style={{fontSize: 30, fontWeight:"bold"}}>{(main.temp_min-273.15).toFixed(2)+'ºC'}</Text>
      </View>
    </View>  

    <View style={styles.containerInformation}>
      <View style={styles.information}>
        <Text style={{fontSize: 16, fontWeight:"bold"}}>Sensação Térmica</Text> 
        <Text style={{fontSize: 30, fontWeight:"bold"}}>{(main.feels_like-273.15).toFixed(2)+'ºC'}</Text>
      </View>

      <View style={styles.information}>
        <Text style={{fontSize: 16, fontWeight:"bold"}}>Umidade do Ar</Text>
        <Text style={{fontSize: 30, fontWeight:"bold"}}>{main.humidity}</Text>
      </View>
    </View>

    <View style={styles.footer}>
      <Text></Text>
    </View>

    <TouchableOpacity>
      <View style={styles.button}>
        <Text onPress={reload} style={styles.buttonText}>Atualizar</Text>
      </View>
      </TouchableOpacity>    
      </ImageBackground>
    </View> 
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    alignItems: 'center',
  },

  containerInformation:{
    display: 'flex',
    flexDirection:'row',
    justifyContent:"space-between",
    marginTop: 115,
    marginHorizontal: 20,
  },

  information: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: "center",
  },

  imageBackground: {
    width: 100
  },

  headerContainer:{
    display:'flex',
    flexDirection: "row-reverse",
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
    paddingHorizontal:5,
    marginHorizontal: 20,
  },

  header:{
    alignItems: 'center',
    justifyContent: 'center',
  },

  footer: {
    flex:1,
    width: '100%',
  },

  dateTime:{
    fontSize: 25,
    width: 150,
    textAlign: 'center',
  },

  icon:{
    width: 100,
    height: 100,
  },

  button: {
    borderRadius: 10,
    paddingVertical: 16,
    backgroundColor: 'skyblue',
    margin: 30,
    marginBottom: 40
  },

  buttonText:{
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    color: 'white',
  }
});
