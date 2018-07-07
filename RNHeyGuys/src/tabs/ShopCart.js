import React from 'react'
import { View, Text, StyleSheet, SectionList } from 'react-native'
import ShopCartItem from '../components/ShopCartItem'


class ShopCart extends React.Component {

  componentDidMount() {
    this.props.navigator.setTabBadge({
      badge: 12
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={[
            {title: 'D', data: ['Devin']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ]}
          renderItem={({item, index}) => this.renderItem(item, index)}

        >
        </SectionList>
      </View>
    )
  }

  renderItem = (item, index) => {
    return (
      <ShopCartItem id={index} />
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
