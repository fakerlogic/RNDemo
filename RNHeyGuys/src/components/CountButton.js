import React from 'react'
import { 
  View, 
  Text,
  TouchableWithoutFeedback
} from 'react-native'


export default class CountButton extends React.Component {

  state = {
      timerCount: this.props.timerCount || 10,
      timerTitle: this.props.timerTitle || '获取验证码',
      counting: false,
      selfEnable: true,
  }

  _countDownAction = () => {
    const codeTime = this.state.timerCount
    const now = Date.now()
    const overTimeStamp = now + codeTime * 1000 + 100/*过期时间戳（毫秒） +100 毫秒容错*/
    this.interval = setInterval(() => {
      /* 切换到后台不受影响*/
      const nowStamp = Date.now()
      if (nowStamp >= overTimeStamp) {
          /* 倒计时结束*/
        this.interval && clearInterval(this.interval);
        this.setState({
          timerCount: codeTime,
          timerTitle: '重新发送',
          counting: false,
          selfEnable: true
        })
        if (this.props.timerEnd) {
          this.props.timerEnd()
        }
      } else {
        const leftTime = parseInt((overTimeStamp - nowStamp) / 1000, 10)
        this.setState({
          timerCount: leftTime,
          timerTitle: `${leftTime}s`,
        })
      }
    }, 1000)
  }

  _shouldStartCountting = (shouldStart) => {
    if (this.state.counting) { return false }
    if (shouldStart) {
      this._countDownAction()
      this.setState({ counting: true, selfEnable: false })
    } else {
      this.setState({ selfEnable: true })
    }
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval)
  }

  render() {
    const { onClick, style, textStyle, enable, disableColor } = this.props
    const { counting, timerTitle, selfEnable } = this.state
    return (
      <TouchableWithoutFeedback activeOpacity={ counting ? 1 : 0.6 } onPress = {() => {
        if (!counting && enable && selfEnable) {
          this.setState({ selfEnable: false })
          onClick(this._shouldStartCountting)
        }
      }}>
        <View style={[{width:100, height:44, justifyContent: 'center', alignItems: 'center'}, style]}>
          <Text style={[{fontSize: 13}, textStyle, {color: ((!counting && enable && selfEnable) ? (textStyle ? textStyle.color : 'blue') : disableColor || 'gray')}]}>{timerTitle}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }

}
