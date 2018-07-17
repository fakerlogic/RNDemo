import Toast from 'react-native-root-toast'
import { Dimensions } from 'react-native'


const SCREEN_WIDTH = Dimensions.get('screen').width
const SCREEN_HEIGHT = Dimensions.get('screen').height

const POSITION = Math.floor(SCREEN_HEIGHT * ( 1 - 0.7 ))

export default function toast(msg) {
  
  const defaultOptions = {
    visible: false,
    position: -POSITION,
    textColor: 'white',
    backgroundColor: 'black'
  }
  return Toast.show(msg, defaultOptions)
}