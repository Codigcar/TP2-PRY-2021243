import React from 'react'
import Button from '../components/Button'
import { Alert, ImageBackground, StyleSheet, View } from 'react-native'
import { Divider, Image, Text } from 'react-native-elements';
import Paragraph from '../components/Paragraph';

export const StartScreen = ({ navigation }: any) => {
  return (
    <ImageBackground
      source={require('../assets/BackgrundInicio.png')}
      style={{height:500}}
    >
      <Divider
        style={{height:50}}
      ></Divider>
      <View
        style={{alignItems:"center"}}
      >
        <Image source={require('../assets/car.png')} style={{width:100, height:100, borderRadius:20}}></Image>
        <Image source={require('../assets/texto_oficial.png')} style={{width:300, height:100, resizeMode:"contain"}}></Image>
      </View>
      <Divider
        style={{height:175}}
      >
      </Divider>
      <Paragraph>
        Reporta accidentes en tiempo real
        Ayuda a la Policía Nacional Perú a atender
        accidentes de tránsito de forma eficiente
      </Paragraph>
      <Button
          mode="contained"
          onPress={() => navigation.navigate('Login')}
          style={{marginTop:10, backgroundColor:'#131E60', width:350, alignSelf:"center"}}
          >
          INGRESAR
      </Button>
      <Button
          mode="contained"
          onPress={
            () =>
            Alert.alert(
              "¿Eres policia?",
              "Si eres policia selecciona sí",
              [
                {text: 'Sí', onPress: () => navigation.navigate('Registrar Policía')},
                {text: 'Usuario General', onPress: () => navigation.navigate('Register')},
              ],
              { 
                cancelable: true 
              }
            )
          }
          style={{marginTop:10, backgroundColor:'#C8013C', width:350, alignSelf:"center"}}
          >
          REGISTRARSE
      </Button>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});