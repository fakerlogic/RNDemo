import { 
  AppRegistry, 
  Platform, 
  AsyncStorage 
} from 'react-native';
import App from './App';
import { Navigation } from 'react-native-navigation'
import Storage from 'react-native-storage'
import Home from './src/tabs/Home'
import Category from './src/tabs/Category'
import ShopCart from './src/tabs/ShopCart'
import Mine from './src/tabs/Mine'
import Profile from './src/profile/Profile'
import Login from './src/login/Login'


var storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
  }
)


function registerScreens() {
  Navigation.registerComponent('RNHeyGuys.Home', () => Home)
  Navigation.registerComponent('RNHeyGuys.Category', () => Category)
  Navigation.registerComponent('RNHeyGuys.ShopCart', () => ShopCart)
  Navigation.registerComponent('RNHeyGuys.Mine', () => Mine)

  Navigation.registerComponent('RNHeyGuys.Profile', () => Profile)
  Navigation.registerComponent('RNHeyGuys.Login', () => Login)
}

registerScreens()

const tabs = [{
  screen: 'RNHeyGuys.Home',
  icon: require('./src/img/tabs/home.png'),
  selectedIcon: require('./src/img/tabs/home_sel.png'),
  iconInsets: { 
    top: 6,
    left: 0,
    bottom: -6,
    right: 0
  },
  title: '首页'
}, {
  screen: 'RNHeyGuys.Category',
  icon: require('./src/img/tabs/category.png'),
  selectedIcon: require('./src/img/tabs/category_sel.png'),
  iconInsets: { 
    top: 6,
    left: 0,
    bottom: -6,
    right: 0
  },
  title: '分类',
}, {
  screen: 'RNHeyGuys.ShopCart',
  icon: require('./src/img/tabs/shopping.png'),
  selectedIcon: require('./src/img/tabs/shopping_sel.png'),
  iconInsets: { 
    top: 6,
    left: 0,
    bottom: -6,
    right: 0
  },
  title: '购物车',

}, {
  screen: 'RNHeyGuys.Mine',
  icon: require('./src/img/tabs/my.png'),
  selectedIcon: require('./src/img/tabs/my_sel.png'),
  iconInsets: { 
    top: 6,
    left: 0,
    bottom: -6,
    right: 0
  },
  title: '我的',
}]

function startApp() {
  
  global.storage = storage

  Navigation.startTabBasedApp({
    tabs,
    tabsStyle: {
      tabBarHidden: true,
      tabBarSelectedButtonColor: 'rgba(254, 205, 63, 1)',
      tabBarBackgroundColor: 'white',
      initialTabIndex: 2,
      
    },
    appStyle: {
      orientation: 'portrait',
      bottomTabBadgeTextColor: '1',
      bottomTabBadgeBackgroundColor: 'red',
    }
  })
}
startApp()


// AppRegistry.registerComponent('RNHeyGuys', () => App);
