import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import Paragraph from '../components/Paragraph'
import { Alert } from 'react-native'

export const StartScreen = ({ navigation }: any) => {
  return (
    <Background>
      <Logo />
      <Header>CarCrash</Header>
      <Paragraph>
        Reporta accidentes en tiempo real.
      </Paragraph>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Login')}
      >
        Login
      </Button>
      <Button
        mode="outlined"
        //onPress={() => navigation.navigate('Register')}
        onPress={
          () =>
          Alert.alert(
            "¿Eres policia?",
            "Si eres policia selecciona sí",
            [
              {text: 'Sí', onPress: () => navigation.navigate('RegisterPolicia')},
              {text: 'Usuario General', onPress: () => navigation.navigate('Register')},
            ],
            { 
              cancelable: true 
            }
          )
        }
      >
        Sign Up
      </Button>
    </Background>
  )
}