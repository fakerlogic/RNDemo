import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { Navigation } from 'react-native-navigation'

import Home from './src/tabs/Home'
import Category from './src/tabs/Category'
import ShopCart from './src/tabs/ShopCart'
import Mine from './src/tabs/Mine'
import Profile from './src/profile/Profile'


function registerScreens() {
  Navigation.registerComponent('RNHeyGuys.Home', () => Home)
  Navigation.registerComponent('RNHeyGuys.Category', () => Category)
  Navigation.registerComponent('RNHeyGuys.ShopCart', () => ShopCart)
  Navigation.registerComponent('RNHeyGuys.Mine', () => Mine)

  Navigation.registerComponent('RNHeyGuys.Profile', () => Profile)
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

Navigation.startTabBasedApp({
  tabs,
  tabsStyle: {
    tabBarSelectedButtonColor: 'rgba(254, 205, 63, 1)',
    tabBarBackgroundColor: 'white',
    initialTabIndex: 3
  },
  appStyle: {
    orientation: 'portrait',
    bottomTabBadgeTextColor: '1',
    bottomTabBadgeBackgroundColor: 'red',
    // backButtonImage: any,
    // hideBackButtonTitle: true
  }
})

// AppRegistry.registerComponent('RNHeyGuys', () => App);
