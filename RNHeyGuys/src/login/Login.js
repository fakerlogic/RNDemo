import React from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Button, 
  TextInput,
  AsyncStorage
} from 'react-native'
import CountButton from '../components/CountButton'
import Api from '../api/api'
import toast from '../utils/toast'

/**
 * 登录注册页面
 *
 * @export
 * @class Login
 * @extends {React.Component}
 */
export default class Login extends React.Component {

  state = {
    phoneNumber: '',
    capcha: ''
  }

  getCapcha = (shouldStartCounting, type) => {
    const regPhone = /^1[345678]\d{9}$/
    const { phoneNumber } = this.state
    if (!regPhone.test(phoneNumber)) {
      toast(`手机号格式输入有误`)
      shouldStartCounting(false)
      return
    }
    const smsCode = type === 'login' ? 3 : 1

    Api.getCapcha(phoneNumber, smsCode)
    .then(res => {
      console.log(`res: ${res}`)
      if (res.succeed) {
        shouldStartCounting(true)
        toast(`验证码发送成功`)
      } else {
        shouldStartCounting(false)
        toast(`error: ${res.errorMsg}`)
      }
    })
    .catch(error => {
      console.log(`error: ${error}`)
      shouldStartCounting(false)
      toast(`网络故障, 请你稍后重试`)
    })
  }

  render() {
    const { type } = this.props
    const { phoneNumber } = this.state

    const buttonTitle = type === 'login' ? '登录' : '注册'

    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../img/login/ip1.png')} resizeMode='contain' />
        <View style={styles.textInputContainer}>
          <Image source={require('../img/login/phone.png')} style={styles.textInputImage}/>
          <TextInput
            style={styles.textInput}
            placeholder='请输入手机号'
            maxLength={11}
            keyboardType='number-pad'
            clearButtonMode='while-editing'
            onChangeText={text => this.setState({phoneNumber: text})}
          />
          <View style={styles.verticalLine}/>
          <CountButton enable={phoneNumber.length === 11}
            style={styles.capcha}
            textStyle={{color: 'black'}}
            onClick={start => this.getCapcha(start, type)}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Image source={require('../img/login/shield.png')} style={styles.textInputImage}/>
          <TextInput
            style={styles.textInput}
            placeholder='请输入验证码'
            keyboardType='number-pad'
            maxLength={4}
            clearButtonMode='while-editing'
            onChangeText={text => this.setState({capcha: text})}
          />
        </View>
        { type === 'register' ? this.renderProtocol() : null }
        <View style={styles.buttonContainer}>
          <Button 
            style={styles.loginButton}
            title={buttonTitle}
            onPress={() => this.loginButtonOnPress(type)} 
            backgroundColor='yellow'
            color='white'
          />
        </View>
        { type === 'login' ? this.renderRegister() : this.renderHasAccount() }

      </View>
    )
  }

  /** render */

  renderRegister = () => {
    return (<Text style={styles.register} onPress={this.registerOnPress}>注册</Text>)
  }

  renderHasAccount = () => {
    return (<Text style={styles.hasAccount} onPress={this.hasAccountOnPress}>已有账号登录</Text>)
  }

  renderProtocol = () => {
    return (
      <View style={{flexDirection: 'row', paddingTop: 20}}>
        <Text>我已同意并阅读</Text>
        <Text style={{color: 'rgba(73, 154, 256, 1)', paddingLeft: 4}}>好伙计用户协议</Text>
      </View>
    )
  }

  /** actions */

  loginButtonOnPress = (type) => {
    console.log('loginButtonOnPress')
    const { phoneNumber, capcha } = this.state
    const smsCode = type === 'login' ? 3 : 1

    Api.login(phoneNumber, capcha, smsCode)
      .then( res => {
        console.log(`res: ${res}`)
        if (res.succeed) {
          toast(`登录成功`)
          this.saveUserInfo(res.data)
        } else {
          toast(`error: ${res.errorMsg}`)
        }
      })
      .catch( error => {
        toast(`网络故障, 请您稍后重试`)
      })
  }

  registerOnPress = () => {
    console.log('registerOnPress')
    this.props.navigator && this.props.navigator.push({
      screen: 'RNHeyGuys.Login',
      title: '注册',
      animated: true,
      backButtonTitle: '',
      passProps: {
        type: 'register'
      }
    })
  }

  hasAccountOnPress = () => {
    console.log('hasAccountOnPress')
    this.props.navigator && this.props.navigator.pop()
  }

  /** private */

  saveUserInfo = (info) => {
    console.log(`storage ====> ${global.storage}`)
    global.storage.save({
      key: 'userInfo',
      data: info,
      expires: null
    })
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'stretch',
    margin: 40,
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 30,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40, 
    borderWidth: 1, 
    borderColor: '#FDCD45', 
    borderRadius: 6,
    marginTop: 10
  },
  textInputImage: {
    width: 16, 
    height: 16,
    resizeMode:'contain',
    marginLeft: 6,
    marginRight: 6
  },
  textInput: {
    height: 40,
    flex: 1,
  },
  verticalLine: {
    width:1,
    height:20,
    backgroundColor:'#FDCD45',
    marginLeft:5,
    marginRight:5,
  },
  capcha: {
    width: 100,
    fontSize: 13,
    marginRight: 5,
    textAlign: 'center',
    alignItems: 'center'
  },
  buttonContainer:{
    backgroundColor: 'orange', 
    borderWidth: 1, 
    borderRadius: 5, 
    borderColor:'white',
    marginTop: 20
  },
  loginButton: {
    color: 'white',
    backgroundColor: 'yellow',
    width: 100,
    height: 40
  },
  register: {
    fontSize: 13,
    marginTop: 10,
    textDecorationLine: 'underline',
    alignSelf: 'flex-start',
  },
  hasAccount: {
    fontSize: 13,
    marginTop: 10,
    textDecorationLine: 'underline',
    marginRight: 0,
    textAlign: 'right',
    alignSelf: 'flex-end',
  }
})