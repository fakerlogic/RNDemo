import React from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  SectionList,
  Alert 
} from 'react-native'
import ShopCartItem from '../components/ShopCartItem'
import Api from '../api/api'

class ShopCart extends React.Component {

  static navigatorButtons = {
    leftButtons: [
      {
        title: '获取列表',
        id: 'shopcart',
        buttonColor: 'red',
        buttonFontSize: 15
      }
    ]
  }

  state = {
    shopCartList: null
  }

  onNavigatorEvent = event => {
    console.log('---------onNavigatorEvent------------')
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'shopcart') {
      }
    }
  }
  componentDidMount() {
    this.props.navigator.setTabBadge({
      badge: 12
    })
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    Api.getShopCartList()
      .then(res => {
        Alert.alert(`res: ${JSON.stringify(res.data.activityList)}`)
        console.log(`shopcart=====>: ${res.data.activityList}`)
        // this.setState({shopCartList: res.data.activityList})
      })
      .catch(e => console.log(`shopcar error: ${e}`))
    
  }

  render() {

    if (this.state.shopCartList === null) {
      return (
        <View style={styles.container}>
          <Text style={{alignSelf: 'center'}}>Loading</Text>
        </View>
      )
    }
    console.log(`shopCartList: ${JSON.stringify(this.state.shopCartList)}`)
    return (
      
      <View style={styles.container}>
        <SectionList
          sections={this.state.shopCartList}
          renderItem={({item, index}) => this.renderItem(item, index)}

        >
        </SectionList>
      </View>
    )
  }

  renderItem = (item, index) => {
    return (
      <ShopCartItem key={`ShopCartItem-${index}`} />
    )
  }
}


export default ShopCart

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})
