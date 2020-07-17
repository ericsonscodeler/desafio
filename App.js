import { StatusBar } from 'expo-status-bar';
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View , SafeAreaView, Button, TouchableOpacity} from 'react-native';
import * as Location from 'expo-location';
import api from '././src/services/api'

export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [weather,setWeather] = useState([])
  const [main,setMain] = useState([])

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
          appid: '16ab16bca622ee871024d4f8d69542d7'
        }
      })
      setWeather(response.data.weather)
      setMain(response.data.main)
    })()
  },[]);

  function update(){
    alert('teste')
  }

  let text = ' Waiting ...'
  let clima = {description: 'teste'}
  let clima2 = ''
  
  if (errorMsg){
    text = errorMsg
  } else if (location){
    text = JSON.stringify(location)
    clima2 = JSON.stringify(main)
  };

  const getCurrentDate = ()=>{

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var hours = new Date().getHours();
    var min = new Date().getMinutes(); 
    return date + '/' + month + '/' + year + ' ' + hours + ':' + min
  }




  return (
    <SafeAreaView style={{ flex:1 }}>
    <View style={styles.container}>
      <Text style={styles.dateTime}>{getCurrentDate()}</Text>
      <Text>{clima.description}</Text>
      <Text>{clima2}</Text>
      <StatusBar style="auto" />
    </View>


    <View style={styles.footer}>
      <Text></Text>
    </View>

    <TouchableOpacity>
      <View style={styles.button}>
        <Text onPress={update} style={styles.buttonText}>Atualizar</Text>
      </View>
    </TouchableOpacity>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 70,
    justifyContent: 'center',
  },

  footer: {
    flex:1,
    width: '100%',
  },
  dateTime:{
    alignItems: 'center',
    fontSize: 20,
    marginTop: 20,
    padding: 20
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
