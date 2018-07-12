import React from 'react'
import {View, Text, StyleSheet, Image, Button, TextInput} from 'react-native'
import CountDownButton from '../components/CountDownButton'

export default class Login extends React.Component {

  state = {
    timerCount: this.props.timerCount || 30,
    timerTitle: this.props.timerTitle || '获取验证码',
    counting: false,
    enable: true,
  }

  shouldStartCountting = (shouldStart) => {
    if (this.state.counting) { return }
    if (shouldStart) {
        this.countDown()
        this.setState({counting: true,selfEnable:false})
    } else {
        this.setState({selfEnable:true})
    }
  }

  countDown = () => {
    console.log(`倒计时===== ${this.state.requestCapchaTime}s`)
    const codeTime = this.state.timerCount;
    const now = Date.now()
    const overTimeStamp = now + codeTime * 1000 + 100/*过期时间戳（毫秒） +100 毫秒容错*/
    this.interval = setInterval(() =>{
        /* 切换到后台不受影响*/
        const nowStamp = Date.now()
        if (nowStamp >= overTimeStamp) {
            /* 倒计时结束*/
            this.interval && clearInterval(this.interval);
            this.setState({
                timerCount: codeTime,
                timerTitle: this.props.timerTitle || '获取验证码',
                counting: false,
                selfEnable: true
            })
            if (this.props.timerEnd) {
                this.props.timerEnd()
            }
        } else {
            const leftTime = parseInt((overTimeStamp - nowStamp)/1000, 10)
            this.setState({
                timerCount: leftTime,
                timerTitle: `重新获取(${leftTime}s)`,
            })
        }
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const {onClick, style, textStyle, enable, disableColor} = this.props
    const {counting, timerTitle, selfEnable} = this.state
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
            onChangeText={(text) => this.setState({text})}
          />
          <View style={styles.verticalLine}/>
          <Text style={styles.capcha} onPress={this.getCapcha}>{this.state.shouldShowCoundDown ? this.state.requestCapchaTime : '获取验证码'}</Text>
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
        <View style={styles.buttonContainer}>
          <Button 
            style={styles.loginButton} 
            title='登录' 
            onPress={this.loginButtonOnPress} 
            backgroundColor='yellow'
            color='white'
          />
        </View>
        <Text style={styles.register}>注册</Text>
      </View>
    )
  }

  loginButtonOnPress = () => {
    // this.refs.toast.show('login', 500)
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
    marginTop: 40,
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
    width: 80,
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
  }
})