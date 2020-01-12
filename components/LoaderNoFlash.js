import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, ActivityIndicator, Button} from 'react-native';
var w = Dimensions.get('window').width;
var h = Dimensions.get('window').height;
Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP);

export default class Collection extends React.Component{
  constructor(props){
    super(props);
    back = 'black';
    front = 'white';
  }
  render(){
    console.log(this.props.uploadProgress.toString() + '%');
    return(
      <View>
      <View style = {{position: 'absolute', height: (100 - this.props.uploadProgress).toString() +'%', width: w, zIndex: 1, backgroundColor: '#fff'}} >
      </View>
      <View style = {{position: 'absolute', height: this.props.uploadProgress.toString() + '%', width: w, zIndex: 2, backgroundColor: '#0ff'}} >
      </View>
      </View>
    )
  }
}
// tintColor: front
{/*<Image source = {require('../Q.png')} style = {{width: w, height: h}}/>*/}
//<Image source = {require('../Q.png')} style = {{width: w, height: h, tintColor: front, position: 'absolute', zIndex: 2}}/>
