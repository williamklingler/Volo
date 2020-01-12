import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, ActivityIndicator, Button} from 'react-native';
var w = Dimensions.get('window').width;
var h = Dimensions.get('window').height;
Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);

export default class Collection extends React.Component{
  constructor(props){
    super(props);
    back = 'white';
    front = 'black';
  }
  componentDidMount(){
    setInterval(function(){
      if (back === 'white'){
        back = 'black';
        front = 'white';
      }
      else{
        back = 'white';
        front = 'black';
      }
    }, 500);
  }
  render(){
    return(
      <View style = {{backgroundColor: back}} >
      <Image source = {require('../Q.png')} style = {{width: w, height: h, tintColor: front,}}/>
      </View>
    )
  }
}
