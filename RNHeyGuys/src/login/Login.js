import React from 'react'
import { View, Text, StyleSheet, Image, Button, TextInput, CheckBox } from 'react-native'
import CountButton from '../components/CountButton'
import Request from '../utils/request'

export default class Login extends React.Component {

  state = {
    phoneNumber: '',
    capcha: ''
  }
  
  componentDidMount() {
    const { type } = this.props
    console.log(`props type: ${type}`)
  }

  getCapcha(shouldStartCounting) {
    console.log('获取验证码中..')
    this.setState({
      state: '正在请求验证码'
    })
    setTimeout(() => {
      const requestSucc = Math.random() + 0.5 > 1
      this.setState({
        state: `（随机）模拟验证码获取${requestSucc ? '成功' : '失败'}`
      })
      shouldStartCounting && shouldStartCounting(requestSucc)
    }, 1000)
  }

  render() {
    const { type } = this.props
    const { phoneNumber } = this.state
    console.log(`phoneNumber: ${phoneNumber}`)
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
            onChangeText={(text) => this.setState({phoneNumber: text})}
          />
          <View style={styles.verticalLine}/>
          <CountButton enable={phoneNumber.length}
            style={styles.capcha}
            textStyle={{color: 'black'}}
            onClick={(shouldStartCounting) => this.getCapcha(shouldStartCounting)}
          />
        </View>
        <View style={styles.textInputContainer}>
          <Image source={require('../img/login/shield.png')} style={styles.textInputImage}/>
          <TextInput
            style={styles.textInput}
            placeholder='请输入验证码'
            keyboardType='number-pad'
            maxLength={4}
            onChangeText={(text) => this.setState({text})}
          />
        </View>
        { type === 'register' ? this.renderProtocol() : null }
        <View style={styles.buttonContainer}>
          <Button 
            style={styles.loginButton} 
            title={buttonTitle}
            onPress={this.loginButtonOnPress} 
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

  loginButtonOnPress = () => {
    // this.refs.toast.show('login', 500)
    console.log('loginButtonOnPress')
  }

  registerOnPress = () => {
    console.log('registerOnPress')
    this.props.navigator && this.props.navigator.push({
      screen: 'RNHeyGuys.Login',
      title: '注册',
      animated: true,
      backButtonTitle: '返回',
      passProps: {
        type: 'register'
      }
    })
  }

  hasAccountOnPress = () => {
    console.log('hasAccountOnPress')
    this.props.navigator && this.props.navigator.pop()
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
    textDecorationLine: 'underline'
  },
  hasAccount: {
    fontSize: 13,
    marginTop: 10,
    textDecorationLine: 'underline',
    marginRight: 0,
    textAlign: 'right'
  }
})