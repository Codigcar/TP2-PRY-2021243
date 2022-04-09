import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, SegmentedControlIOSBase } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { fieldValidator } from '../helpers/fieldValidator'
import { ScrollView } from 'react-native-gesture-handler'
import fetchWithToken from '../utils/fetchCustom'
import { Card, Divider } from 'react-native-elements'
import { CardImage } from '@react-native-elements/base/dist/Card/Card.Image'

export const RegisterPoliceScreen = ({ navigation }: any) => {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [dni, setDni] = useState({value: '', error: ''})
  const [birthDay, setBirthday] = useState({value: '', error: ''})
  const [phone, setPhone] = useState({value: '', error: ''})
  const [license, setLicense] = useState({value: '', error: ''})
  const [patrol, setPatrol] = useState({value: '', error: ''})

  const onSignUpPressed = async () => {
    const nameError = fieldValidator(name.value)
    const birthDayError = fieldValidator(birthDay.value)
    const dniError = fieldValidator(dni.value)
    const phoneError = fieldValidator(phone.value)
    const licenseError = fieldValidator(phone.value)
    const patrolError = fieldValidator(phone.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError || birthDayError || dniError || phoneError || patrolError || licenseError) {
      setDni({...dni, error: dniError})
      setName({ ...name, error: nameError })
      setPhone({ ...phone, error: phoneError })
      setLicense({ ...license, error: licenseError })
      setPatrol({ ...patrol, error: patrolError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setBirthday({...birthDay, error: birthDayError})
      return
    }
    const data: any = {
      "dni": dni.value,
      "name": name.value,
      "phone": phone.value,
      "dateOfBirth": birthDay.value,
      "email": email.value,
      "password": password.value,
      "license": license.value,
      "patrolNumber": patrol.value,
      "userType": "POLICIA"
    }

    try {
      await fetchWithToken(`api/users`, data, 'POST');
      navigation.navigate('Login')
    } catch (error) {
      throw(error)
    }
  }

  return (
    <ScrollView>
      <Background>
      <Card wrapperStyle={{width:300, alignItems:"center"}} containerStyle={{borderRadius:30}}>
        <CardImage source={require('../assets/car.png')} style={{width:100, height:100}}></CardImage>
        <CardImage source={require('../assets/texto_oficial.png')} style={{width:300, height:100, resizeMode:"contain"}}></CardImage>
        <TextInput
          label="DNI"
          returnKeyType="next"
          value={dni.value}
          onChangeText={(text: string) => setDni({ value: text, error: '' })}
          error={!!dni.error}
          errorText={dni.error}
        />
        <TextInput
          label="Nombre"
          returnKeyType="next"
          value={name.value}
          onChangeText={(text: string) => setName({ value: text, error: '' })}
          error={!!name.error}
          errorText={name.error}
        />
        <TextInput
          label="Número"
          returnKeyType="next"
          value={phone.value}
          onChangeText={(text: string) => setPhone({ value: text, error: '' })}
          error={!!phone.error}
          errorText={phone.error}
        />
        <TextInput
          label="Fecha de nacimiento"
          returnKeyType="next"
          value={birthDay.value}
          onChangeText={(text: string) => setBirthday({ value: text, error: '' })}
          error={!!birthDay.error}
          errorText={birthDay.error}
        />
        <TextInput
          label="Licencia"
          returnKeyType="next"
          value={license.value}
          onChangeText={(text: string) => setLicense({ value: text, error: '' })}
          error={!!license.error}
          errorText={license.error}
        />
        <TextInput
          label="Número de patrulla"
          returnKeyType="next"
          value={patrol.value}
          onChangeText={(text: string) => setPatrol({ value: text, error: '' })}
          error={!!patrol.error}
          errorText={patrol.error}
        />
        <TextInput
          label="Correo"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text: string) => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          label="Contraseña"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text: string) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
        <Button
          mode="contained"
          onPress={onSignUpPressed}
          style={{ marginTop: 24, backgroundColor:'#C8013C' }}
          >
          REGISTRATE
        </Button>
      </Card>
      <Divider style={{height:20}}></Divider>
      <Text>Ya tienes una cuenta? </Text>
      <Button
          mode="contained"
          onPress={() => navigation.replace('Login')}
          style={{marginTop:24, backgroundColor:'#131E60'}}
          >
          INGRESAR
      </Button>
    </Background>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
})